import type {
  LastFmArtist,
  LastFmQueryResponse,
  LastFmRecentTrack,
  LastFmRequest,
  LastFmTrack,
  LastFmUser,
} from "./generic.js";

// track.search
export type LastFmTrackSearchParameters = {
  track: string;
  artist?: string;
  page?: number;
  limit?: number;
};
export type LastFmTrackSearchResponse = LastFmQueryResponse<{
  trackmatches: {
    track: LastFmTrack[];
  };
}>;
export type LastFmTrackSearchRequest = LastFmRequest<LastFmTrackSearchParameters, LastFmTrackSearchResponse>;

// artist.search
export type LastFmArtistSearchParameters = {
  artist: string;
  page?: number;
  limit?: number;
};
export type LastFmArtistSearchResponse = LastFmQueryResponse<{
  artistmatches: {
    artist: LastFmArtist[];
  };
}>;
export type LastFmArtistSearchRequest = LastFmRequest<LastFmArtistSearchParameters, LastFmArtistSearchResponse>;

// user.getInfo
export type LastFmUserGetInfoParameters = {
  user?: string;
};
export type LastFmUserGetInfoResponse = { user: LastFmUser };
export type LastFmUserGetInfoRequest = LastFmRequest<LastFmUserGetInfoParameters, LastFmUserGetInfoResponse>;

// user.getRecentTracks
export type LastFmUserGetRecentTracksParameters = {
  user: string;
  limit?: number;
  page?: number;
  from?: number;
  to?: number;
  extended?: 0 | 1;
};
export type LastFmUserGetRecentTracksResponse = { recenttracks: { track: LastFmRecentTrack[] } };
export type LastFmUserGetRecentTracksRequest = LastFmRequest<
  LastFmUserGetRecentTracksParameters,
  LastFmUserGetRecentTracksResponse
>;
