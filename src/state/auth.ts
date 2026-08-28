import { createPersistedSignal } from "../util/persistedSignal.js";

export const lastFmKey = createPersistedSignal("lastFmKey", null);
export const lastFmName = createPersistedSignal("lastFmName", null);
export const lastFmUrl = createPersistedSignal("lastFmUrl", null);
export const lastFmImage = createPersistedSignal("lastFmImage", null);
export const authTimeStamp = createPersistedSignal("lastFmAuthTimestamp", null);
