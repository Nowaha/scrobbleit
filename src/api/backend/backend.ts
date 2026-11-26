import { BackendApi } from "./api.tsx";
import {
  BackendGetSessionRequest,
  BackendGetSessionResponse,
  BackendResponseError,
  BackendResponseSuccess,
  BackendScrobbleRequest,
  BackendScrobbleResponse,
} from "./generic.ts";

const BACKEND_BASE_URL = "http://localhost:3001";

export const getSession: BackendGetSessionRequest = async ({ token }) => {
  const res = await fetch(BACKEND_BASE_URL + "/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) {
    const errorDetails = await res.json().catch(() => {});
    return { success: false, error: { code: res.status, error: errorDetails } } as BackendResponseError;
  }
  const json = await res.json();
  return { success: true, data: json } as BackendResponseSuccess<BackendGetSessionResponse>;
};

const scrobble: BackendScrobbleRequest = async (scrobbleParams) => {
  const res = await fetch(BACKEND_BASE_URL + "/scrobble", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(scrobbleParams),
  });
  if (!res.ok) {
    const errorDetails = await res.json().catch(() => {});
    return { success: false, error: { code: res.status, error: errorDetails } } as BackendResponseError;
  }
  const json = await res.json();
  return { success: true, data: json } as BackendResponseSuccess<BackendScrobbleResponse>;
};

const initBackendApi = (): BackendApi => ({
  getSession,
  scrobble,
});

const backendApi = initBackendApi();
export const getBackendApi = () => backendApi;
