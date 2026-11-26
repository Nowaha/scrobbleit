import { batch } from "solid-js";
import { getBackendApi } from "../api/backend/backend.ts";
import { getLastFmApi } from "../api/lastfm/lastfm.ts";
import { toasts } from "../service/toastService.ts";
import { checkCallback } from "../util/callback.ts";
import { createPersistedSignal } from "../util/persistedSignal.ts";

export const [lastFmKey, setLastFmKey] = createPersistedSignal("lastFmKey");
export const [lastFmName, setLastFmName] = createPersistedSignal("lastFmName");
const [lastFmImage, setLastFmImage] = createPersistedSignal("lastFmImage");
export const [authTimeStamp, setAuthTimeStamp] = createPersistedSignal("authTimeStamp");

export const signOut = (): void =>
  batch(() => {
    setAuthTimeStamp(null);
    setLastFmImage(null);
    setLastFmKey(null);
    setLastFmName(null);
  });

export const handleAuthCallback = async (): Promise<void> => {
  const token = checkCallback();
  if (!token) {
    return;
  }

  const session = await getBackendApi().getSession({ token });
  if (!session.success) {
    toasts.error(`Login failed: ${session.error.error?.message ?? session.error.code}`);
    return;
  }

  toasts.success(`Logged in as ${session.data.name}!`);

  batch(() => {
    setLastFmKey(session.data.key);
    setLastFmName(session.data.name);
    setAuthTimeStamp(String(Date.now()));
  });
};

export const fetchProfileImage = async (username: string): Promise<string | undefined> => {
  const cached = lastFmImage();
  if (cached) {
    return cached;
  }

  toasts.info("Fetching profile picture...");
  try {
    const info = await getLastFmApi().user.getInfo({ user: username });
    if (!info.success) {
      throw info.error;
    }
    const image = info.data.user.image.at(-1)?.["#text"] || null;
    setLastFmImage(image);
    toasts.success("Loaded profile picture!");
    return image ?? undefined;
  } catch (error) {
    toasts.error("Failed to load profile picture.");
    console.error(error);
    return undefined;
  }
};
