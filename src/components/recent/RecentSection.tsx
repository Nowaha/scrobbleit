import { createResource, For, type JSX } from "solid-js";
import type { LastFmRecentTrack } from "../../api/lastfm/generic.ts";
import { getLastFmApi } from "../../api/lastfm/lastfm.ts";
import { useToasts } from "../../service/toastService.ts";
import { lastFmName } from "../../state/auth.ts";
import { fillScrobbleForm } from "../../state/scrobbleForm.ts";
import Section from "../basic/Section.tsx";
import RecentTrack from "./RecentTrack.tsx";

const RecentSection = (): JSX.Element => {
  const toasts = useToasts();
  const lastFmApi = getLastFmApi();

  const [recentTracks] = createResource(
    () => lastFmName() ?? false,
    async (user) => {
      const res = await lastFmApi.user.getRecentTracks({ user, limit: 10 });
      if (!res.success) {
        toasts.error(`Couldn't load recent tracks: ${res.error.message}`);
        return [];
      }
      return res.data.recenttracks.track;
    },
    { initialValue: [] },
  );

  const onCopy = (track: LastFmRecentTrack): void => {
    fillScrobbleForm({
      track: track.name,
      artist: track.artist["#text"],
      album: track.album?.["#text"],
    });
    toasts.info(`Copied "${track.artist["#text"]} - ${track.name}" to form`, { timeout: "short" });
  };

  const onScrobble = (track: LastFmRecentTrack): void => {
    toasts.success(`Scrobbled ${track.artist["#text"]} - ${track.name}`);
  };

  return (
    <Section id="recent" icon="fa-record-vinyl" title="Recent" description="Your most recent scrobbles.">
      <div class="flex flex-col gap-1">
        <For each={recentTracks.latest}>
          {(track) => <RecentTrack track={track} onCopy={() => onCopy(track)} onScrobble={() => onScrobble(track)} />}
        </For>
      </div>
    </Section>
  );
};

export default RecentSection;
