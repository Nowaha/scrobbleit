import { lastFmName } from "../../state/auth.js";
import { createInputFocusGroup } from "../../util/focus.js";
import { createEffect, createSignal } from "../../util/state.js";
import Button from "../basic/Button.js";
import Section from "../basic/Section.js";
import Show from "../basic/Show.js";
import ControlledInput from "../ControlledInput.js";
import SpinningCircle from "../SpinningCircle.js";
import ScrobbleButton from "./ScrobbleButton.js";

const ManualSection = (): HTMLElement => {
  const manualForm = createSignal<HTMLFormElement | undefined>(undefined);

  const trackName = createSignal("");
  const trackNameError = createSignal<string | undefined>(undefined);
  const artistName = createSignal("");
  const artistNameError = createSignal<string | undefined>(undefined);
  const albumName = createSignal("");
  const albumNameError = createSignal<string | undefined>(undefined);
  const albumArtist = createSignal("");
  const albumArtistError = createSignal<string | undefined>(undefined);

  const hasEntries = createSignal(false);
  createEffect(() => {
    hasEntries.set(
      trackName() !== "" ||
        artistName() !== "" ||
        albumName() !== "" ||
        albumArtist() !== "" ||
        trackNameError() !== undefined ||
        artistNameError() !== undefined ||
        albumNameError() !== undefined ||
        albumArtistError() !== undefined,
    );
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!trackName()) trackNameError.set("Track name is required");
    if (!artistName()) artistNameError.set("Artist name is required");
  };

  createEffect(() => {
    const form = manualForm();
    const username = lastFmName();
    if (form === undefined || username === undefined || username === null) return;
    createInputFocusGroup(form);
  });

  return (
    <Section
      id="manualSection"
      icon="fa-pencil"
      title="Manual"
      description="Manually enter the details of the track you'd like to scrobble."
    >
      <form id="manualForm" class="flex flex-col gap-3" onsubmit={handleSubmit} ref={manualForm.set}>
        <ControlledInput id="trackName" label="Track Name" value={trackName} error={trackNameError} required />
        <ControlledInput id="artistName" label="Artist Name" value={artistName} error={artistNameError} required />
        <ControlledInput id="albumName" label="Album Name" value={albumName} error={albumNameError} />
        <ControlledInput
          id="albumArtist"
          label="Album Artist"
          value={albumArtist}
          error={albumArtistError}
          placeholder={artistName}
        />
        <div class="flex w-full justify-end gap-4">
          <Show when={hasEntries}>
            <Button
              variant="secondary"
              type="reset"
              on={{
                click: () => {
                  trackName.set("");
                  trackNameError.set(undefined);
                  artistName.set("");
                  artistNameError.set(undefined);
                  albumName.set("");
                  albumNameError.set(undefined);
                  albumArtist.set("");
                  albumArtistError.set(undefined);
                },
              }}
            >
              Clear
            </Button>
          </Show>
          <div>
            <SpinningCircle />
            <ScrobbleButton />
          </div>
        </div>
      </form>
    </Section>
  );
};

export default ManualSection;
