import { afterEach, describe, expect, it, vi } from "vitest";
import { checkCallback } from "../callback.ts";

const replaceState = vi.fn<History["replaceState"]>();

const stubWindowAt = (href: string): void => {
  vi.stubGlobal("window", {
    location: { href },
    history: { replaceState },
  });
};

const replacedUrl = (): string => String(replaceState.mock.calls[0]?.[2]);

describe("checkCallback", () => {
  afterEach(() => {
    replaceState.mockReset();
    vi.unstubAllGlobals();
  });

  it("returns the token URL parameter", () => {
    stubWindowAt("https://example.com/some/path?token=abc123");

    expect(checkCallback()).toBe("abc123");
  });

  it("removes the token from the URL while keeping the rest", () => {
    stubWindowAt("https://example.com/some/path?foo=bar&token=abc123#section");

    checkCallback();

    expect(replaceState).toHaveBeenCalledOnce();
    expect(replacedUrl()).toBe("https://example.com/some/path?foo=bar#section");
  });

  it("returns undefined and leaves the URL alone when there is no token", () => {
    stubWindowAt("https://example.com/some/path?foo=bar");

    expect(checkCallback()).toBeUndefined();
    expect(replaceState).not.toHaveBeenCalled();
  });

  it("treats an empty token as no token", () => {
    stubWindowAt("https://example.com/?token=");

    expect(checkCallback()).toBeUndefined();
    expect(replaceState).not.toHaveBeenCalled();
  });
});
