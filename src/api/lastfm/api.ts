import type {
  LastFmArtistSearchRequest,
  LastFmTrackSearchRequest,
  LastFmUserGetInfoRequest,
  LastFmUserGetRecentTracksRequest,
} from "./methods.ts";

export type LastFmApi = {
  track: {
    search: LastFmTrackSearchRequest;
  };
  artist: {
    search: LastFmArtistSearchRequest;
  };
  user: {
    getInfo: LastFmUserGetInfoRequest;
    getRecentTracks: LastFmUserGetRecentTracksRequest;
  };
};
