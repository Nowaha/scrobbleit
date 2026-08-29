export type LastFmError = {
  error: number;
  message: string;
};

export type LastFmParameters = Record<string, string | number | boolean>;
export type LastFmResponseError = { success: false; data: never; error: LastFmError };
export type LastFmResponseSuccess<T> = { success: true; data: T; error: never };
export type LastFmResponse<T> = LastFmResponseSuccess<T> | LastFmResponseError;

export type LastFmRequest<P extends LastFmParameters, T> = (parameters: P) => Promise<LastFmResponse<T>>;

export type LastFmOpenSearchQuery = {
  "#text": string;
  role: string;
  searchTerms: string;
  startPage: number;
};

export type LastFmQueryResponse<T> = {
  results: {
    "opensearch:Query": LastFmOpenSearchQuery;
    "opensearch:totalResults": number;
    "opensearch:startIndex": number;
    "opensearch:itemsPerPage": number;
  } & T;
};

export type MBID = string;

export type LastFmImage = {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
};

export type LastFmEntity = {
  name: string;
  url: string;
  streamable: number;
  listeners: number;
  image: LastFmImage[];
  mbid: MBID;
};

export type LastFmArtist = LastFmEntity;

export type LastFmTrack = LastFmEntity & {
  artist: string;
};

export type LastFmRecentTrack = LastFmEntity & {
  artist: { mbid: string; "#text": string };
  date: {
    uts: number;
    "#text": string;
  };
};

export type LastFmUser = {
  spotify_expiry_estimate?: {
    unixtime: number;
    "#text": number;
  };
  playcount: number;
  playlists: number;
  album_count: number;
  bootstrap: number;
  url: string;
  age: number;
  name: string;
  artist_count: number;
  subscriber: number;
  track_count: number;
  realname: string;
  image: LastFmImage[];
  registered: {
    unixtime: number;
    "#text": number;
  };
  country: string;
  gender: "m" | "f" | "n";
  corrections: number;
  type: "subscriber";
};
