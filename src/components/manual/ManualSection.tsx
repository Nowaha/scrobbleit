import { createSignal } from "../../util/state.js";
import Section from "../basic/Section.js";
import Spacer from "../basic/Spacer.js";
import ControlledInput from "../ControlledInput.js";
import SpinningCircle from "../SpinningCircle.js";
import ScrobbleButton from "./ScrobbleButton.js";

const ManualSection = (): HTMLElement => {
  const trackName = createSignal("");
  const trackNameError = createSignal<string | undefined>(undefined);
  const artistName = createSignal("");
  const artistNameError = createSignal<string | undefined>(undefined);
  const albumName = createSignal("");
  const albumNameError = createSignal<string | undefined>(undefined);
  const albumArtist = createSignal("");
  const albumArtistError = createSignal<string | undefined>(undefined);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!trackName()) trackNameError.set("Track name is required");
    if (!artistName()) artistNameError.set("Artist name is required");
  };

  return (
    <Section
      id="manualSection"
      icon="fa-record-vinyl"
      title="Manual"
      description="Manually enter the details of the track you'd like to scrobble."
    >
      <form id="manualForm" class="flex flex-col gap-4" onsubmit={handleSubmit}>
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
        <ScrobbleButton />
        <SpinningCircle />
      </form>
    </Section>
  );
};

export default ManualSection;
