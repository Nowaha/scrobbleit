export type BackendParameters = Record<string, string | number | boolean>;
type BackendError = {
  code: number;
  error: BackendErrorDetails;
};
type BackendErrorDetails = {
  error_type: "upstream_error" | "invalid_auth" | "bad_request";
  message: string;
};

export type BackendResponseSuccess<T> = { success: true; data: T; error: never };
export type BackendResponseError = { success: false; data: never; error: BackendError };
export type BackendResponse<T> = BackendResponseSuccess<T> | BackendResponseError;

export type BackendRequest<P extends BackendParameters, T> = (parameters: P) => Promise<BackendResponse<T>>;

export type BackendGetSessionParameters = {
  token: string;
};
export type BackendGetSessionResponse = {
  name: string;
  key: string;
  subscriber: number;
};
export type BackendGetSessionRequest = BackendRequest<BackendGetSessionParameters, BackendGetSessionResponse>;

export type BackendScrobbleParameters = {
  session_key: string;
  track_name: string;
  artist_name: string;
  timestamp: number;
  album_name?: string;
  album_artist?: string;
};
type LastFmCorrectedText = {
  corrected: "0" | "1";
  "#text"?: string;
};

type LastFmScrobble = {
  artist: LastFmCorrectedText;
  album: LastFmCorrectedText;
  albumArtist: LastFmCorrectedText;
  track: LastFmCorrectedText;
  ignoredMessage: {
    code: string;
    "#text"?: string;
  };
  timestamp: string;
};

export type BackendScrobbleResponse = {
  scrobbles: {
    "@attr": {
      accepted: number;
      ignored: number;
    };
    scrobble: LastFmScrobble;
  };
};
export type BackendScrobbleRequest = BackendRequest<BackendScrobbleParameters, BackendScrobbleResponse>;
