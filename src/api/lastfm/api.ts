import {
  LastFmArtistSearchRequest,
  LastFmTrackSearchRequest,
  LastFmUserGetInfoRequest,
  LastFmUserGetRecentTracksRequest,
} from "./methods.tsx";

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
