import type { BackendApi } from "./api.ts";
import type { BackendParameters, BackendRequest, BackendResponseError, BackendResponseSuccess } from "./generic.ts";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? `http://${window.location.hostname}:3001`;

const postJson =
  <P extends BackendParameters, T>(path: string): BackendRequest<P, T> =>
  async (parameters) => {
    const response = await fetch(BACKEND_BASE_URL + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parameters),
    });
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => undefined);
      return { success: false, error: { code: response.status, error: errorDetails } } as BackendResponseError;
    }
    return { success: true, data: await response.json() } as BackendResponseSuccess<T>;
  };

export const backendApi: BackendApi = {
  getSession: postJson("/auth"),
  scrobble: postJson("/scrobble"),
};
