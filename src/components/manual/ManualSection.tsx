import { createSignal, Show } from "solid-js";
import {
  clearManualForm,
  clearManualFormErrors,
  hasManualEntries,
  manualForm,
  setManualError,
  setManualField,
  setManualForm,
} from "../../state/manualForm.ts";
import { focusNextInputOnEnter } from "../../util/focus.ts";
import Button from "../basic/Button.tsx";
import Section from "../basic/Section.tsx";
import ControlledInput from "../ControlledInput.tsx";
import ScrobbleButton from "./ScrobbleButton.tsx";
import TrackNameAutocomplete from "./TrackNameAutocomplete.tsx";
import { getBackendApi } from "../../api/backend/backend.ts";
import { lastFmKey } from "../../state/auth.ts";
import { useToasts } from "../../service/toastService.ts";

const ManualSection = () => {
  let artistNameInput!: HTMLInputElement;

  const toasts = useToasts();
  const backendApi = getBackendApi();

  const [submitting, setSubmitting] = createSignal(false);

  const albumArtistPlaceholder = () => manualForm.values.artist.trim() || "Album Artist";

  const handleSubmit = async () => {
    if (submitting()) return;

    clearManualFormErrors();

    let valid = true;

    if (!manualForm.values.track.trim()) {
      setManualError("track", "Track name is required");
      valid = false;
    }
    if (!manualForm.values.artist.trim()) {
      setManualError("artist", "Artist name is required");
      valid = false;
    }

    if (!valid) return;
    setSubmitting(true);

    try {
      const result = await backendApi.scrobble({
        session_key: lastFmKey() as string,
        track_name: manualForm.values.track,
        artist_name: manualForm.values.artist,
        timestamp: Math.floor(Date.now() / 1000),
        album_name: manualForm.values.album.trim().length > 0 ? manualForm.values.album : undefined,
        album_artist: manualForm.values.albumArtist.trim().length > 0 ? manualForm.values.albumArtist : undefined,
      });
      if (result.error) {
        toasts.error(`Scrobble failed: ${result.error.error?.message ?? result.error.code}`);
        console.error(result.error);
        return;
      }
      toasts.success(
        `Scrobbled ${result.data.scrobbles.scrobble.artist["#text"]} - ${result.data.scrobbles.scrobble.track["#text"]}!`,
      );
    } catch (error) {
      toasts.error(`Scrobble failed: ${(error as { message: string }).message}`);
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section
      id="scrobbleTrackSection"
      icon="fa-pencil"
      title="Scrobble Track"
      description="Enter the details of the track you'd like to scrobble."
    >
      <div id="manualForm" class="flex flex-col gap-3" onKeyDown={focusNextInputOnEnter}>
        <TrackNameAutocomplete
          id="trackName"
          value={manualForm.values.track}
          error={manualForm.errors.track}
          onInput={(v) => setManualField("track", v)}
          onResultSelected={(result) => {
            setManualForm("values", { track: result.name, artist: result.artist, album: "", albumArtist: "" });
            setManualForm("errors", { track: undefined, artist: undefined });
            artistNameInput.focus();
          }}
          disabled={submitting()}
        />
        <ControlledInput
          id="artistName"
          label="Artist Name"
          placeholder="Artist Name"
          value={manualForm.values.artist}
          error={manualForm.errors.artist}
          onInput={(v) => setManualField("artist", v)}
          required
          disabled={submitting()}
          ref={(el) => (artistNameInput = el)}
        />
        <ControlledInput
          id="albumName"
          label="Album Name"
          placeholder="Album Name"
          value={manualForm.values.album}
          error={manualForm.errors.album}
          onInput={(v) => setManualField("album", v)}
          disabled={submitting()}
        />
        <ControlledInput
          id="albumArtist"
          label="Album Artist"
          value={manualForm.values.albumArtist}
          error={manualForm.errors.albumArtist}
          onInput={(v) => setManualField("albumArtist", v)}
          placeholder={albumArtistPlaceholder()}
          disabled={submitting()}
        />
        <div class="flex w-full justify-end gap-4">
          <Show when={hasManualEntries()}>
            <Button variant="secondary" type="reset" onClick={clearManualForm} disabled={submitting()}>
              Clear
            </Button>
          </Show>
          <div>
            <ScrobbleButton onClick={handleSubmit} loading={submitting()} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ManualSection;
