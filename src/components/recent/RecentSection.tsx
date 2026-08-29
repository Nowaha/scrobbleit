import { getLastFmApi } from "../../api/lastfm/lastfm.js";
import { lastFmName } from "../../state/auth.js";
import { createEffect, createSignal } from "../../util/state.js";
import Section from "../basic/Section.js";
import RecentTrack from "./RecentTrack.js";

const RecentSection = () => {
  const recentRef = createSignal<HTMLDivElement | undefined>(undefined);
  const lastFmApi = getLastFmApi();

  createEffect(() => {
    const recent = recentRef();
    const username = lastFmName();
    if (recent === undefined || username === undefined || username === null) return;

    lastFmApi.user.getRecentTracks({ user: username, limit: 10 }).then((res) => {
      recent.replaceChildren();

      res.data.recenttracks.track.forEach((track) => {
        recent.appendChild(<RecentTrack track={track} />);
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
