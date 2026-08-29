import {
  LastFmArtistSearchRequest,
  LastFmTrackSearchRequest,
  LastFmUserGetInfoRequest,
  LastFmUserGetRecentTracksRequest,
} from "./methods.js";

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
