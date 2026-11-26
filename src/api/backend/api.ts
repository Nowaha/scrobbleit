import type { BackendGetSessionRequest, BackendScrobbleRequest } from "./generic.ts";

export type BackendApi = {
  getSession: BackendGetSessionRequest;
  scrobble: BackendScrobbleRequest;
};
