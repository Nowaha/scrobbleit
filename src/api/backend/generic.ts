type BackendParameters = Record<string, string | number | boolean>;
type BackendError = {
  code: number;
  error: string;
};

export type BackendResponseSuccess<T> = { success: true; data: T; error: never };
export type BackendResponseError = { success: false; data: never; error: BackendError };
export type BackendResponse<T> = BackendResponseSuccess<T> | BackendResponseError;

type BackendRequest<P extends BackendParameters, T> = (parameters: P) => Promise<BackendResponse<T>>;

export type BackendGetSessionParameters = {
  token: string;
};
export type BackendGetSessionResponse = {
  name: string;
  key: string;
  subscriber: number;
};
export type BackendGetSessionRequest = BackendRequest<BackendGetSessionParameters, BackendGetSessionResponse>;
