import type { LastFmArtist, LastFmQueryResponse, LastFmRequest, LastFmTrack, LastFmUser } from "./generic.js";

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
