const ITUNES_SEARCH_URL = "https://itunes.apple.com/search";

type ITunesSearchResponse = {
  results: { artworkUrl30?: string }[];
};

export const fetchImageUrl = async (artist: string, track: string): Promise<string | undefined> => {
  const parameters = new URLSearchParams({ term: `${artist} ${track}`, entity: "song", limit: "1" });
  const response = await fetch(`${ITUNES_SEARCH_URL}?${parameters}`);
  if (!response.ok) {
    throw new Error(`iTunes search failed with status ${response.status}`);
  }
  const json: ITunesSearchResponse = await response.json();
  return json.results[0]?.artworkUrl30;
};
