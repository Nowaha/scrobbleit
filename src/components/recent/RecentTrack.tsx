import { LastFmRecentTrack } from "../../api/lastfm/generic";
import { createEffect, createSignal } from "../../util/state";
import { timeAgo } from "../../util/time";
import Button from "../basic/Button";
import Icon from "../basic/Icon";
import Show from "../basic/Show";

type RecentTrackProps = {
  track: LastFmRecentTrack;
  onScrobble: () => void;
  onCopy: () => void;
};

const RecentTrack = ({ track, onScrobble, onCopy }: RecentTrackProps) => {
  const hovered = createSignal(false);
  const isNowPlaying = track["@attr"]?.nowplaying;

  return (
    <div
      class="flex items-center gap-2 rounded-md p-2 hover:bg-ctp-surface0"
      onmouseenter={() => hovered.set(true)}
      onmouseleave={() => hovered.set(false)}
    >
      <img class="size-10 rounded-md" src={track.image[2]["#text"]} />
      <div class="flex items-center gap-1">
        <div class="flex flex-col">
          <a
            class="text text-sm font-bold text-ctp-text hover:text-ctp-mauve hover:underline"
            href={track.url}
            target="_blank"
          >
            {track.name}
          </a>
          <a
            class="text-sm text-ctp-subtext0 hover:text-ctp-mauve hover:underline"
            href={`https://www.last.fm/music/${track.artist["#text"]}`}
            target="_blank"
          >
            {track.artist["#text"]}
          </a>
        </div>
      </div>
      <Show
        when={hovered}
        fallback={() => (
          <Show
            when={isNowPlaying}
            fallback={() => <span class="ml-auto text-sm text-ctp-subtext1">{timeAgo(track.date.uts)}</span>}
          >
            <div class="ml-auto flex justify-end gap-1 align-bottom">
              <div class="bars">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
              </div>
              <span class="ml-auto text-sm text-ctp-subtext1">Now</span>
            </div>
          </Show>
        )}
      >
        <div class="ml-auto flex gap-1">
          <Button variant="secondary" onclick={onCopy}>
            <Icon icon="fa-copy" />
          </Button>
          <Button variant="primary" onclick={onScrobble}>
            <Icon icon="fa-record-vinyl" />
          </Button>
        </div>
      </Show>
    </div>
  );
};

export default RecentTrack;
