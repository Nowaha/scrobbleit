import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchImageUrl } from "../iTunes.ts";

const fetchMock = vi.fn<typeof fetch>();

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const requestedUrl = (): URL => new URL(String(fetchMock.mock.calls[0]?.[0]));

describe("fetchImageUrl", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("searches iTunes for a single song by artist and track", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ results: [] }));

    await fetchImageUrl("Artist", "Track");

    const url = requestedUrl();
    expect(url.origin + url.pathname).toBe("https://itunes.apple.com/search");
    expect(url.searchParams.get("term")).toBe("Artist Track");
    expect(url.searchParams.get("entity")).toBe("song");
    expect(url.searchParams.get("limit")).toBe("1");
  });

  it("encodes special characters in the search term", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ results: [] }));

    await fetchImageUrl("AC/DC", "Rock & Roll?#1");

    const url = requestedUrl();
    expect(url.searchParams.get("term")).toBe("AC/DC Rock & Roll?#1");
    expect(url.searchParams.get("entity")).toBe("song");
    expect(url.hash).toBe("");
  });

  it("returns the artwork URL of the first result", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({
        results: [{ artworkUrl30: "https://img.test/1.jpg" }, { artworkUrl30: "https://img.test/2.jpg" }],
      }),
    );

    await expect(fetchImageUrl("Artist", "Track")).resolves.toBe("https://img.test/1.jpg");
  });

  it("returns undefined when there are no results", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ results: [] }));

    await expect(fetchImageUrl("Unknown", "Track")).resolves.toBeUndefined();
  });

  it("returns undefined when the result has no artwork", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ results: [{}] }));

    await expect(fetchImageUrl("Artist", "Track")).resolves.toBeUndefined();
  });

  it("throws when the request fails", async () => {
    fetchMock.mockResolvedValue(new Response("Service Unavailable", { status: 503 }));

    await expect(fetchImageUrl("Artist", "Track")).rejects.toThrow("iTunes search failed with status 503");
  });
});
