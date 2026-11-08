import { Show } from "solid-js";
import {
  clearManualForm,
  hasManualEntries,
  manualForm,
  setManualError,
  setManualField,
  setManualForm,
} from "../../state/manualForm.js";
import { focusNextInputOnEnter } from "../../util/focus.js";
import Button from "../basic/Button.js";
import Section from "../basic/Section.js";
import ControlledInput from "../ControlledInput.js";
import SpinningCircle from "../SpinningCircle.js";
import ScrobbleButton from "./ScrobbleButton.js";
import TrackNameAutocomplete from "./TrackNameAutocomplete.js";

const ManualSection = () => {
  let artistNameInput!: HTMLInputElement;

  const albumArtistPlaceholder = () => manualForm.values.artist.trim() || "Album Artist";

  const handleSubmit = () => {
    if (!manualForm.values.track.trim()) setManualError("track", "Track name is required");
    if (!manualForm.values.artist.trim()) setManualError("artist", "Artist name is required");
  };

  return (
    <Section
      id="manualSection"
      icon="fa-pencil"
      title="Manual"
      description="Manually enter the details of the track you'd like to scrobble."
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
        />
        <ControlledInput
          id="artistName"
          label="Artist Name"
          placeholder="Artist Name"
          value={manualForm.values.artist}
          error={manualForm.errors.artist}
          onInput={(v) => setManualField("artist", v)}
          required
          ref={(el) => (artistNameInput = el)}
        />
        <ControlledInput
          id="albumName"
          label="Album Name"
          placeholder="Album Name"
          value={manualForm.values.album}
          error={manualForm.errors.album}
          onInput={(v) => setManualField("album", v)}
        />
        <ControlledInput
          id="albumArtist"
          label="Album Artist"
          value={manualForm.values.albumArtist}
          error={manualForm.errors.albumArtist}
          onInput={(v) => setManualField("albumArtist", v)}
          placeholder={albumArtistPlaceholder()}
        />
        <div class="flex w-full justify-end gap-4">
          <Show when={hasManualEntries()}>
            <Button variant="secondary" type="reset" onClick={clearManualForm}>
              Clear
            </Button>
          </Show>
          <div>
            <SpinningCircle />
            <ScrobbleButton onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ManualSection;
