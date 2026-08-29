import { LastFmApi } from "./api.js";
import { LastFmParameters, LastFmResponseError, LastFmResponseSuccess } from "./generic.js";
import {
  LastFmArtistSearchRequest,
  LastFmTrackSearchRequest,
  LastFmUserGetInfoRequest,
  LastFmUserGetRecentTracksRequest,
} from "./methods.js";

const LAST_FM_API_URL = "https://ws.audioscrobbler.com/2.0";
const LAST_FM_API_KEY = "9f13628487188e6e5727c9b99e30b9a8";
const LAST_FM_AUTH_CALLBACK = "http://localhost:8080";
const LAST_FM_AUTH_URL = "http://www.last.fm/api/auth/?api_key=" + LAST_FM_API_KEY + "&cb=" + LAST_FM_AUTH_CALLBACK;

export const getLastFmAuthUrl = () => LAST_FM_AUTH_URL;

const makeLastFmRequest = (method: string, parameters: LastFmParameters) => {
  const urlParameters = new URLSearchParams({
    method,
    format: "json",
    api_key: LAST_FM_API_KEY,
    ...parameters,
  });
  return fetch(`${LAST_FM_API_URL}?${urlParameters}`);
};

export const basicRequest = <R>(method: string): R =>
  (async (parameters: LastFmParameters) => {
    const response = await makeLastFmRequest(method, parameters);
    const json = await response.json();

    if (!response.ok || json.error) {
      return { success: false, error: json } as LastFmResponseError;
    }
    return { success: true, data: json } as LastFmResponseSuccess<unknown>;
  }) as R;

const initLastFmApi = (): LastFmApi => ({
  track: {
    search: basicRequest<LastFmTrackSearchRequest>("track.search"),
  },
  artist: {
    search: basicRequest<LastFmArtistSearchRequest>("artist.search"),
  },
  user: {
    getInfo: basicRequest<LastFmUserGetInfoRequest>("user.getInfo"),
    getRecentTracks: basicRequest<LastFmUserGetRecentTracksRequest>("user.getRecentTracks"),
  },
});

const lastFmApi = initLastFmApi();
export const getLastFmApi = () => lastFmApi;
