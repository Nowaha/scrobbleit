import type { LastFmApi } from "./api.ts";
import type { LastFmParameters, LastFmRequest, LastFmResponseError, LastFmResponseSuccess } from "./generic.ts";

const LAST_FM_API_URL = "https://ws.audioscrobbler.com/2.0";
const LAST_FM_API_KEY = "9f13628487188e6e5727c9b99e30b9a8";
const LAST_FM_AUTH_CALLBACK = window.location.origin;
const LAST_FM_AUTH_URL = "http://www.last.fm/api/auth/?api_key=" + LAST_FM_API_KEY + "&cb=" + LAST_FM_AUTH_CALLBACK;

export const getLastFmAuthUrl = (): string => LAST_FM_AUTH_URL;

const makeLastFmRequest = (method: string, parameters: LastFmParameters): Promise<Response> => {
  const urlParameters = new URLSearchParams({
    method,
    format: "json",
    api_key: LAST_FM_API_KEY,
    ...parameters,
  });
  return fetch(`${LAST_FM_API_URL}?${urlParameters}`);
};

const basicRequest =
  <P extends LastFmParameters, T>(method: string): LastFmRequest<P, T> =>
  async (parameters) => {
    const response = await makeLastFmRequest(method, parameters);
    const json = await response.json();

    if (!response.ok || json.error) {
      return { success: false, error: json } as LastFmResponseError;
    }
    return { success: true, data: json } as LastFmResponseSuccess<T>;
  };

export const lastFmApi: LastFmApi = {
  track: {
    search: basicRequest("track.search"),
  },
  artist: {
    search: basicRequest("artist.search"),
  },
  user: {
    getInfo: basicRequest("user.getInfo"),
    getRecentTracks: basicRequest("user.getRecentTracks"),
  },
};
