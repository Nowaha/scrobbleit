import { batch } from "solid-js";
import { getBackendApi } from "../api/backend/backend.js";
import { getLastFmApi } from "../api/lastfm/lastfm.js";
import { toasts } from "../service/toastService.js";
import { checkCallback } from "../util/callback.js";
import { createPersistedSignal } from "../util/persistedSignal.js";

export const [lastFmKey, setLastFmKey] = createPersistedSignal("lastFmKey");
export const [lastFmName, setLastFmName] = createPersistedSignal("lastFmName");
export const [lastFmImage, setLastFmImage] = createPersistedSignal("lastFmImage");
export const [authTimeStamp, setAuthTimeStamp] = createPersistedSignal("authTimeStamp");

export const signOut = () =>
  batch(() => {
    setAuthTimeStamp(null);
    setLastFmImage(null);
    setLastFmKey(null);
    setLastFmName(null);
  });

export const handleAuthCallback = async () => {
  const token = checkCallback();
  if (!token) return;

  const session = await getBackendApi().getSession({ token });
  if (!session.success) {
    toasts.error(`Login failed: ${session.error.error?.message ?? session.error.code}`);
    return;
  }

  batch(() => {
    setLastFmKey(session.data.key);
    setLastFmName(session.data.name);
    setAuthTimeStamp(String(Date.now()));
  });

  const info = await getLastFmApi().user.getInfo({ user: session.data.name });
  if (info.success) setLastFmImage(info.data.user.image.at(-1)?.["#text"] ?? null);

  toasts.success(`Logged in as ${session.data.name}`);
};
