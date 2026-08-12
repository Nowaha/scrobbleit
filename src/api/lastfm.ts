const LAST_FM_API_URL = "https://ws.audioscrobbler.com/2.0";
const LAST_FM_API_KEY = "63efc313966fb1f7675cd9cb4c1ad274";

export const method = {
  artist: {
    search: "artist.search",
  },
  track: {
    search: "track.search",
  },
};

const getUrl = (method: string): string =>
  `${LAST_FM_API_URL}?method=${method}`;

export const makeLastFmRequest = (
  method: string,
  parameters: string,
): Promise<Response> =>
  fetch(
    `${getUrl(method)}&format=json&api_key=${LAST_FM_API_KEY}&${parameters}`,
  );

export const searchArtist = async (artist?: string, limit = 5) => {
  const response = await makeLastFmRequest(
    method.artist.search,
    `artist=${artist}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};

export const searchTrack = async (
  track: string,
  artist?: string,
  limit = 5,
) => {
  const response = await makeLastFmRequest(
    method.track.search,
    `track=${track}${artist ? `&artist=${artist}` : ""}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};
