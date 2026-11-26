import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { backendApi } from "../api/backend/backend.ts";
import { toasts } from "../service/toastService.ts";
import { lastFmKey } from "./auth.ts";

export type ScrobbleFormField = "track" | "artist" | "album" | "albumArtist";

type ScrobbleFormState = {
  values: Record<ScrobbleFormField, string>;
  errors: Record<ScrobbleFormField, string | undefined>;
};

const emptyForm = (): ScrobbleFormState => ({
  values: { track: "", artist: "", album: "", albumArtist: "" },
  errors: { track: undefined, artist: undefined, album: undefined, albumArtist: undefined },
});

export const [scrobbleForm, setScrobbleForm] = createStore<ScrobbleFormState>(emptyForm());

const [isSubmitting, setIsSubmitting] = createSignal(false);
export { isSubmitting };

export const setScrobbleField = (field: ScrobbleFormField, value: string): void => {
  setScrobbleForm("values", field, value);
  setScrobbleForm("errors", field, undefined);
};

export const setScrobbleError = (field: ScrobbleFormField, error: string | undefined): void =>
  setScrobbleForm("errors", field, error);

export const fillScrobbleForm = (data: { track: string; artist: string; album?: string }): void =>
  setScrobbleForm({
    values: { track: data.track, artist: data.artist, album: data.album ?? "", albumArtist: "" },
    errors: emptyForm().errors,
  });

export const clearScrobbleForm = (): void => setScrobbleForm(emptyForm());

export const clearScrobbleFormErrors = (): void => setScrobbleForm("errors", emptyForm().errors);

export const hasScrobbleEntries = (): boolean =>
  Object.values(scrobbleForm.values).some((v) => v !== "") ||
  Object.values(scrobbleForm.errors).some((e) => e !== undefined);

const validateScrobbleForm = (): boolean => {
  clearScrobbleFormErrors();

  let isValid = true;
  if (!scrobbleForm.values.track.trim()) {
    setScrobbleError("track", "Track name is required");
    isValid = false;
  }
  if (!scrobbleForm.values.artist.trim()) {
    setScrobbleError("artist", "Artist name is required");
    isValid = false;
  }
  return isValid;
};

const optional = (value: string): string | undefined => (value.trim() ? value : undefined);

export const submitScrobbleForm = async (): Promise<void> => {
  if (isSubmitting() || !validateScrobbleForm()) {
    return;
  }

  const sessionKey = lastFmKey();
  if (!sessionKey) {
    toasts.error("Scrobble failed: you are not logged in");
    return;
  }

  setIsSubmitting(true);
  try {
    const { values } = scrobbleForm;
    const result = await backendApi.scrobble({
      session_key: sessionKey,
      track_name: values.track,
      artist_name: values.artist,
      timestamp: Math.floor(Date.now() / 1000),
      album_name: optional(values.album),
      album_artist: optional(values.albumArtist),
    });
    if (!result.success) {
      toasts.error(`Scrobble failed: ${result.error.error?.message ?? result.error.code}`);
      console.error(result.error);
      return;
    }
    const { scrobble } = result.data.scrobbles;
    toasts.success(`Scrobbled ${scrobble.artist["#text"]} - ${scrobble.track["#text"]}!`);
  } catch (error) {
    toasts.error(`Scrobble failed: ${error instanceof Error ? error.message : String(error)}`);
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};
