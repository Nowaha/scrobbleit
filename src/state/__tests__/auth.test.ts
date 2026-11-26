// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LastFmUserGetInfoResponse } from "../../api/lastfm/methods.ts";
import { fail, ok } from "../../api/result.ts";
import type * as Backend from "../../api/backend/backend.ts";
import type * as Auth from "../auth.ts";

const mocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  getInfo: vi.fn(),
  checkCallback: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock("../../api/backend/backend.ts", async (importOriginal) => ({
  ...(await importOriginal<typeof Backend>()),
  backendApi: { getSession: mocks.getSession },
}));

vi.mock("../../api/lastfm/lastfm.ts", () => ({
  lastFmApi: { user: { getInfo: mocks.getInfo } },
}));

vi.mock("../../util/callback.ts", () => ({
  checkCallback: mocks.checkCallback,
}));

vi.mock("../../service/toastService.ts", () => ({
  toasts: { success: mocks.toastSuccess, error: mocks.toastError, info: vi.fn(), warning: vi.fn() },
}));

const NOW = 1_700_000_000_000;
const STORAGE_KEY = "session";

const storedSession = (): unknown => JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");

const userInfo = (...imageUrls: string[]): LastFmUserGetInfoResponse =>
  ({
    user: { image: imageUrls.map((url) => ({ "#text": url, size: "small" })) },
  }) as LastFmUserGetInfoResponse;

let auth: typeof Auth;

const loadAuth = async (savedSession?: Auth.Session): Promise<void> => {
  if (savedSession) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSession));
  }
  vi.resetModules();
  // Re-importing also reloads Solid, which would otherwise warn about multiple instances
  delete (globalThis as { Solid$$?: boolean }).Solid$$;
  auth = await import("../auth.ts");
};

describe("auth", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  describe("session", () => {
    it("starts signed out when nothing is saved", async () => {
      await loadAuth();

      expect(auth.session()).toBeNull();
    });

    it("restores a saved session", async () => {
      await loadAuth({ key: "key", name: "user", authenticatedAt: NOW });

      expect(auth.session()).toEqual({ key: "key", name: "user", authenticatedAt: NOW });
    });
  });

  describe("signOut", () => {
    it("clears the session and the saved copy", async () => {
      await loadAuth({ key: "key", name: "user", authenticatedAt: NOW });

      auth.signOut();

      expect(auth.session()).toBeNull();
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
  });

  describe("handleAuthCallback", () => {
    it("does nothing when the URL has no token", async () => {
      await loadAuth();
      mocks.checkCallback.mockReturnValue(undefined);

      await auth.handleAuthCallback();

      expect(mocks.getSession).not.toHaveBeenCalled();
      expect(auth.session()).toBeNull();
    });

    it("exchanges the token for a session and saves it", async () => {
      await loadAuth();
      mocks.checkCallback.mockReturnValue("token");
      mocks.getSession.mockResolvedValue(ok({ key: "key", name: "user", subscriber: 0 }));

      await auth.handleAuthCallback();

      const expected = { key: "key", name: "user", authenticatedAt: NOW };
      expect(mocks.getSession).toHaveBeenCalledWith({ token: "token" });
      expect(auth.session()).toEqual(expected);
      expect(storedSession()).toEqual(expected);
      expect(mocks.toastSuccess).toHaveBeenCalledWith("Logged in as user!");
    });

    it("shows an error and stays signed out when the backend rejects the token", async () => {
      await loadAuth();
      mocks.checkCallback.mockReturnValue("token");
      mocks.getSession.mockResolvedValue(
        fail({ code: 401, error: { error_type: "invalid_auth", message: "Invalid token" } }),
      );

      await auth.handleAuthCallback();

      expect(auth.session()).toBeNull();
      expect(mocks.toastError).toHaveBeenCalledWith("Login failed: Invalid token");
    });
  });

  describe("fetchProfileImage", () => {
    const signedIn: Auth.Session = { key: "key", name: "user", authenticatedAt: NOW };

    it("returns the cached image without calling Last.fm", async () => {
      await loadAuth({ ...signedIn, image: "https://img.test/cached.png" });

      await expect(auth.fetchProfileImage("user")).resolves.toBe("https://img.test/cached.png");
      expect(mocks.getInfo).not.toHaveBeenCalled();
    });

    it("fetches the largest image and caches it in the session", async () => {
      await loadAuth(signedIn);
      mocks.getInfo.mockResolvedValue(ok(userInfo("https://img.test/small.png", "https://img.test/large.png")));

      await expect(auth.fetchProfileImage("user")).resolves.toBe("https://img.test/large.png");
      expect(mocks.getInfo).toHaveBeenCalledWith({ user: "user" });
      expect(auth.session()?.image).toBe("https://img.test/large.png");
      expect(storedSession()).toMatchObject({ image: "https://img.test/large.png" });
    });

    it("returns undefined when the user has no profile picture", async () => {
      await loadAuth(signedIn);
      mocks.getInfo.mockResolvedValue(ok(userInfo("")));

      await expect(auth.fetchProfileImage("user")).resolves.toBeUndefined();
    });

    it("does not cache the image when another user is signed in", async () => {
      await loadAuth({ ...signedIn, name: "other" });
      mocks.getInfo.mockResolvedValue(ok(userInfo("https://img.test/user.png")));

      await expect(auth.fetchProfileImage("user")).resolves.toBe("https://img.test/user.png");
      expect(auth.session()?.image).toBeUndefined();
    });

    it.each([
      [
        "Last.fm returns an error",
        (): void => void mocks.getInfo.mockResolvedValue(fail({ error: 6, message: "No user" })),
      ],
      ["the request throws", (): void => void mocks.getInfo.mockRejectedValue(new Error("Network error"))],
    ])("shows an error and returns undefined when %s", async (_, arrange) => {
      vi.spyOn(console, "error").mockImplementation(() => undefined);
      await loadAuth(signedIn);
      arrange();

      await expect(auth.fetchProfileImage("user")).resolves.toBeUndefined();
      expect(mocks.toastError).toHaveBeenCalledWith("Failed to load profile picture.");
    });
  });
});
