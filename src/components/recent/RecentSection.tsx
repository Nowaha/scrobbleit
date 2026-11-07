import { getLastFmApi } from "../../api/lastfm/lastfm.js";
import { useToasts } from "../../service/toastService.js";
import { lastFmName } from "../../state/auth.js";
import { fillManualForm } from "../../state/manualForm.js";
import { createEffect, createSignal } from "../../util/state.js";
import Section from "../basic/Section.js";
import RecentTrack from "./RecentTrack.js";

const RecentSection = () => {
  const toasts = useToasts();
  const recentRef = createSignal<HTMLDivElement | undefined>(undefined);
  const lastFmApi = getLastFmApi();

  createEffect(() => {
    const recent = recentRef();
    const username = lastFmName();
    if (recent === undefined || username === undefined || username === null) return;

    lastFmApi.user.getRecentTracks({ user: username, limit: 10 }).then((res) => {
      recent.replaceChildren();

      res.data.recenttracks.track.forEach((track) => {
        const onCopy = () =>
          fillManualForm({
            track: track.name,
            artist: track.artist["#text"],
            album: track.album?.["#text"],
          });

        const onScrobble = () => {
          toasts.success(`Scrobbled ${track.artist["#text"]} - ${track.name}`);
        };
        recent.appendChild(<RecentTrack track={track} onCopy={onCopy} onScrobble={onScrobble} />);
      });
    });
  });
  return (
    <Section id="recent" icon="fa-record-vinyl" title="Recent" description="Your most recent scrobbles.">
      <div class="flex flex-col gap-1" ref={recentRef.set}></div>
    </Section>
  );
};

export default RecentSection;
