import { Show, type JSX } from "solid-js";
import {
  clearScrobbleForm,
  fillScrobbleForm,
  hasScrobbleEntries,
  isSubmitting,
  scrobbleForm,
  setScrobbleField,
  submitScrobbleForm,
} from "../../state/scrobbleForm.ts";
import { focusNextInputOnEnter } from "../../util/focus.ts";
import Button from "../basic/Button.tsx";
import ControlledInput from "../basic/input/ControlledInput.tsx";
import Section from "../basic/Section.tsx";
import ScrobbleButton from "./ScrobbleButton.tsx";
import TrackNameAutocomplete from "./TrackNameAutocomplete.tsx";

const ScrobbleSection = (): JSX.Element => {
  let artistNameInput: HTMLInputElement | undefined;

  const albumArtistPlaceholder = (): string => scrobbleForm.values.artist.trim() || "Album Artist";

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    void submitScrobbleForm();
  };

  const handleReset = (e: Event): void => {
    e.preventDefault();
    clearScrobbleForm();
  };

  return (
    <Section
      id="scrobbleTrackSection"
      icon="fa-pencil"
      title="Scrobble Track"
      description="Enter the details of the track you'd like to scrobble."
    >
      <form
        id="scrobbleForm"
        class="flex flex-col gap-3"
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
        onKeyDown={focusNextInputOnEnter}
      >
        <TrackNameAutocomplete
          id="trackName"
          value={scrobbleForm.values.track}
          error={scrobbleForm.errors.track}
          onInput={(v) => setScrobbleField("track", v)}
          onResultSelected={(result) => {
            fillScrobbleForm({ track: result.name, artist: result.artist });
            artistNameInput?.focus();
          }}
          disabled={isSubmitting()}
        />
        <ControlledInput
          id="artistName"
          label="Artist Name"
          placeholder="Artist Name"
          value={scrobbleForm.values.artist}
          error={scrobbleForm.errors.artist}
          onInput={(v) => setScrobbleField("artist", v)}
          required
          disabled={isSubmitting()}
          ref={(el) => (artistNameInput = el)}
        />
        <ControlledInput
          id="albumName"
          label="Album Name"
          placeholder="Album Name"
          value={scrobbleForm.values.album}
          error={scrobbleForm.errors.album}
          onInput={(v) => setScrobbleField("album", v)}
          disabled={isSubmitting()}
        />
        <ControlledInput
          id="albumArtist"
          label="Album Artist"
          value={scrobbleForm.values.albumArtist}
          error={scrobbleForm.errors.albumArtist}
          onInput={(v) => setScrobbleField("albumArtist", v)}
          placeholder={albumArtistPlaceholder()}
          disabled={isSubmitting()}
        />
        <div class="flex w-full justify-end gap-4">
          <Show when={hasScrobbleEntries()}>
            <Button variant="secondary" type="reset" disabled={isSubmitting()}>
              Clear
            </Button>
          </Show>
          <ScrobbleButton loading={isSubmitting()} />
        </div>
      </form>
    </Section>
  );
};

export default ScrobbleSection;
