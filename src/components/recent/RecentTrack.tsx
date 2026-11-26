import { Match, Switch, type JSX } from "solid-js";
import type { LastFmRecentTrack } from "../../api/lastfm/generic.ts";
import { timeAgo } from "../../util/time.ts";
import Button from "../basic/Button.tsx";
import Icon from "../basic/Icon.tsx";

const LARGE_IMAGE_INDEX = 2;

type RecentTrackProps = {
  track: LastFmRecentTrack;
  onScrobble: () => void;
  onCopy: () => void;
};

const RecentTrack = (props: RecentTrackProps): JSX.Element => (
  <div class="group flex items-center gap-2 rounded-md p-2 hover:bg-ctp-surface0">
    <img class="size-10 rounded-md" src={props.track.image[LARGE_IMAGE_INDEX]["#text"]} />
    <div class="flex flex-col">
      <a
        class="text-sm font-bold text-ctp-text hover:text-ctp-mauve hover:underline"
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
    <div class="ml-auto flex gap-1 align-bottom group-focus-within:hidden group-hover:hidden">
      <Switch>
        <Match when={props.track["@attr"]?.nowplaying}>
          <div class="bars">
            <div class="bar" />
            <div class="bar" />
            <div class="bar" />
          </div>
          <span class="text-sm text-ctp-subtext0">Now</span>
        </Match>
        <Match when={props.track.date}>
          {(date) => <span class="text-sm text-ctp-subtext0">{timeAgo(date().uts)}</span>}
        </Match>
      </Switch>
    </div>
    <div class="ml-auto hidden gap-1 group-focus-within:flex group-hover:flex">
      <Button variant="secondary" onClick={() => props.onCopy()}>
        <Icon icon="fa-copy" />
      </Button>
      <Button variant="primary" onClick={() => props.onScrobble()}>
        <Icon icon="fa-record-vinyl" />
      </Button>
    </div>
  </div>
);

export default RecentTrack;
