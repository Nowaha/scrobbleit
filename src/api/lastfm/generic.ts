import type { Result } from "../result.ts";

export type LastFmError = {
  error: number;
  message: string;
};

export type LastFmParameters = Record<string, string | number | boolean>;
export type LastFmResponse<T> = Result<T, LastFmError>;

export type LastFmRequest<P extends LastFmParameters, T> = (parameters: P) => Promise<LastFmResponse<T>>;

export type LastFmOpenSearchQuery = {
  "#text": string;
  role: string;
  searchTerms: string;
  startPage: string;
};

export type LastFmQueryResponse<T> = {
  results: {
    "opensearch:Query": LastFmOpenSearchQuery;
    "opensearch:totalResults": string;
    "opensearch:startIndex": string;
    "opensearch:itemsPerPage": string;
  } & T;
};

export type MBID = string;

export type LastFmNumericString = string;

export type LastFmImage = {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
};

export type LastFmEntity = {
  name: string;
  url: string;
  streamable: LastFmNumericString;
  listeners: LastFmNumericString;
  image: LastFmImage[];
  mbid: MBID;
};

export type LastFmArtist = LastFmEntity;

export type LastFmTrack = LastFmEntity & {
  artist: string;
};

export type LastFmRecentTrackCurrentlyPlaying = {
  "@attr": {
    nowplaying: "true";
  };
  date?: undefined;
};

export type LastFmRecentTrackScrobbled = {
  "@attr"?: undefined;
  date: {
    uts: LastFmNumericString;
    "#text": string;
  };
};

export type LastFmRecentTrack = LastFmEntity & {
  artist: { mbid: string; "#text": string };
  album: { mbid: string; "#text": string };
} & (LastFmRecentTrackCurrentlyPlaying | LastFmRecentTrackScrobbled);

export type LastFmUser = {
  spotify_expiry_estimate?: {
    unixtime: LastFmNumericString;
    "#text": number;
  };
  playcount: LastFmNumericString;
  playlists: LastFmNumericString;
  album_count: LastFmNumericString;
  bootstrap: LastFmNumericString;
  url: string;
  age: LastFmNumericString;
  name: string;
  artist_count: LastFmNumericString;
  subscriber: LastFmNumericString;
  track_count: LastFmNumericString;
  realname: string;
  image: LastFmImage[];
  registered: {
    unixtime: LastFmNumericString;
    "#text": number;
  };
  country: string;
  gender: "m" | "f" | "n";
  corrections: number;
  type: "subscriber";
};
