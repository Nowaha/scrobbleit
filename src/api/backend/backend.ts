import { BackendApi } from "./api.js";
import {
  BackendGetSessionRequest,
  BackendGetSessionResponse,
  BackendResponseError,
  BackendResponseSuccess,
} from "./generic.js";

const BACKEND_BASE_URL = "http://localhost:3000";

export const getSession: BackendGetSessionRequest = async ({ token }) => {
  const res = await fetch(BACKEND_BASE_URL + "/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { success: false, error: { code: res.status, error: text } } as BackendResponseError;
  }
  const json = await res.json();
  return { success: true, data: json } as BackendResponseSuccess<BackendGetSessionResponse>;
};

const initBackendApi = (): BackendApi => ({
  getSession,
});

const backendApi = initBackendApi();
export const getBackendApi = () => backendApi;
