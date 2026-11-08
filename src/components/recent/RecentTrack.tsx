import { createSignal, Show } from "solid-js";
import type { LastFmRecentTrack } from "../../api/lastfm/generic.js";
import { timeAgo } from "../../util/time.js";
import Button from "../basic/Button.js";
import Icon from "../basic/Icon.js";

type RecentTrackProps = {
  track: LastFmRecentTrack;
  onScrobble: () => void;
  onCopy: () => void;
};

const RecentTrack = (props: RecentTrackProps) => {
  const [hovered, setHovered] = createSignal(false);
  const isNowPlaying = () => !!props.track["@attr"]?.nowplaying;

  return (
    <div
      class="flex items-center gap-2 rounded-md p-2 hover:bg-ctp-surface0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img class="size-10 rounded-md" src={props.track.image[2]["#text"]} />
      <div class="flex items-center gap-1">
        <div class="flex flex-col">
          <a
            class="text text-sm font-bold text-ctp-text hover:text-ctp-mauve hover:underline"
            href={props.track.url}
            target="_blank"
          >
            {props.track.name}
          </a>
          <a
            class="text-sm text-ctp-subtext0 hover:text-ctp-mauve hover:underline"
            href={`https://www.last.fm/music/${props.track.artist["#text"]}`}
            target="_blank"
          >
            {props.track.artist["#text"]}
          </a>
        </div>
      </div>
      <Show
        when={hovered()}
        fallback={
          <Show
            when={isNowPlaying()}
            fallback={<span class="ml-auto text-sm text-ctp-subtext0">{timeAgo(props.track.date.uts)}</span>}
          >
            <div class="ml-auto flex justify-end gap-1 align-bottom">
              <div class="bars">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
              </div>
              <span class="ml-auto text-sm text-ctp-subtext0">Now</span>
            </div>
          </Show>
        }
      >
        <div class="ml-auto flex gap-1">
          <Button variant="secondary" onClick={() => props.onCopy()}>
            <Icon icon="fa-copy" />
          </Button>
          <Button variant="primary" onClick={() => props.onScrobble()}>
            <Icon icon="fa-record-vinyl" />
          </Button>
        </div>
      </Show>
    </div>
  );
};

export default RecentTrack;
