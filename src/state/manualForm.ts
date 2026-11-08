import { createStore } from "solid-js/store";

export type ManualFormField = "track" | "artist" | "album" | "albumArtist";

type ManualFormState = {
  values: Record<ManualFormField, string>;
  errors: Record<ManualFormField, string | undefined>;
};

const emptyForm = (): ManualFormState => ({
  values: { track: "", artist: "", album: "", albumArtist: "" },
  errors: { track: undefined, artist: undefined, album: undefined, albumArtist: undefined },
});

export const [manualForm, setManualForm] = createStore<ManualFormState>(emptyForm());

/** Sets a field's value and clears its error. */
export const setManualField = (field: ManualFormField, value: string) => {
  setManualForm("values", field, value);
  setManualForm("errors", field, undefined);
};

export const setManualError = (field: ManualFormField, error: string | undefined) =>
  setManualForm("errors", field, error);

export const fillManualForm = (data: { track: string; artist: string; album?: string }) =>
  setManualForm({
    values: { track: data.track, artist: data.artist, album: data.album ?? "", albumArtist: "" },
    errors: emptyForm().errors,
  });

export const clearManualForm = () => setManualForm(emptyForm());

export const hasManualEntries = () =>
  Object.values(manualForm.values).some((v) => v !== "") ||
  Object.values(manualForm.errors).some((e) => e !== undefined);
