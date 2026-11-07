import { createSignal } from "../util/state.js";

export const trackName = createSignal("");
export const trackNameError = createSignal<string | undefined>(undefined);
export const artistName = createSignal("");
export const artistNameError = createSignal<string | undefined>(undefined);
export const albumName = createSignal("");
export const albumNameError = createSignal<string | undefined>(undefined);
export const albumArtist = createSignal("");
export const albumArtistError = createSignal<string | undefined>(undefined);

export const fillManualForm = (data: { track: string; artist: string; album?: string }) => {
  trackName.set(data.track);
  artistName.set(data.artist);
  albumName.set(data.album ?? "");
  albumArtist.set("");

  clearErrors();

  document.getElementById("manualSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const clearErrors = () => {
  trackNameError.set(undefined);
  artistNameError.set(undefined);
  albumNameError.set(undefined);
  albumArtistError.set(undefined);
};
