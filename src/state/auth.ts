import { backendApi, describeBackendError } from "../api/backend/backend.ts";
import { lastFmApi } from "../api/lastfm/lastfm.ts";
import { toasts } from "../service/toastService.ts";
import { checkCallback } from "../util/callback.ts";
import { createPersistedSignal } from "../util/persistedSignal.ts";

export type Session = {
  key: string;
  name: string;
  authenticatedAt: number;
  image?: string;
};

const [session, setSession] = createPersistedSignal<Session | null>("session", null);
export { session };

export const signOut = (): void => setSession(null);

export const handleAuthCallback = async (): Promise<void> => {
  const token = checkCallback();
  if (!token) {
    return;
  }

  const response = await backendApi.getSession({ token });
  if (!response.success) {
    toasts.error(`Login failed: ${describeBackendError(response.error)}`);
    return;
  }

  toasts.success(`Logged in as ${response.data.name}!`);
  setSession({ key: response.data.key, name: response.data.name, authenticatedAt: Date.now() });
};

export const fetchProfileImage = async (username: string): Promise<string | undefined> => {
  const cached = session()?.image;
  if (cached) {
    return cached;
  }

  try {
    const info = await lastFmApi.user.getInfo({ user: username });
    if (!info.success) {
      throw info.error;
    }
    const image = info.data.user.image.at(-1)?.["#text"] || undefined;
    const current = session();
    if (current?.name === username) {
      setSession({ ...current, image });
    }
    return image;
  } catch (error) {
    toasts.error("Failed to load profile picture.");
    console.error(error);
    return undefined;
  }
};
