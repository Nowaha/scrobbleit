import { batch, createEffect, on, untrack } from "solid-js";
import { getBackendApi } from "../api/backend/backend.ts";
import { getLastFmApi } from "../api/lastfm/lastfm.ts";
import { toasts } from "../service/toastService.ts";
import { checkCallback } from "../util/callback.ts";
import { createPersistedSignal } from "../util/persistedSignal.ts";

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

  toasts.success(`Logged in as ${session.data.name}!`);

  batch(() => {
    setLastFmKey(session.data.key);
    setLastFmName(session.data.name);
    setAuthTimeStamp(String(Date.now()));
  });
};

createEffect(
  on(lastFmName, (username) => {
    if (!username || untrack(lastFmImage)) return;

    toasts.info("Fetching profile picture...");

    getLastFmApi()
      .user.getInfo({ user: username })
      .then((info) => {
        if (info.success) {
          setLastFmImage(info.data.user.image.at(-1)?.["#text"] || null);
          toasts.success("Loaded profile picture!");
        } else {
          toasts.error("Failed to load profile picture.");
          console.error(info);
        }
      })
      .catch((err) => {
        toasts.error("Failed to load profile picture.");
        console.error(err);
      });
  }),
);
