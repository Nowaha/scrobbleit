import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { backendApi, describeBackendError } from "../backend.ts";

const fetchMock = vi.fn<typeof fetch>();

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("backendApi", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("posts the parameters as JSON to the backend", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ name: "user", key: "abc", subscriber: 0 }));

    await backendApi.getSession({ token: "token" });

    expect(fetchMock).toHaveBeenCalledWith("http://backend.test/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: "token" }),
    });
  });

  it("returns the parsed body on success", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ name: "user", key: "abc", subscriber: 0 }));

    const result = await backendApi.getSession({ token: "token" });

    expect(result).toEqual({ success: true, data: { name: "user", key: "abc", subscriber: 0 } });
  });

  it("returns the status and error details on failure", async () => {
    const details = { error_type: "invalid_auth", message: "Invalid token" };
    fetchMock.mockResolvedValue(jsonResponse(details, 401));

    const result = await backendApi.getSession({ token: "bad" });

    expect(result).toEqual({ success: false, error: { code: 401, error: details } });
  });

  it("still fails cleanly when the error body is not JSON", async () => {
    fetchMock.mockResolvedValue(new Response("Bad Gateway", { status: 502 }));

    const result = await backendApi.scrobble({
      session_key: "abc",
      track_name: "Track",
      artist_name: "Artist",
      timestamp: 0,
    });

    expect(result).toEqual({ success: false, error: { code: 502, error: undefined } });
  });
});

describe("describeBackendError", () => {
  it("prefers the backend's message", () => {
    expect(describeBackendError({ code: 401, error: { error_type: "invalid_auth", message: "Invalid token" } })).toBe(
      "Invalid token",
    );
  });

  it("falls back to the HTTP status", () => {
    expect(describeBackendError({ code: 502 })).toBe("HTTP 502");
  });
});
