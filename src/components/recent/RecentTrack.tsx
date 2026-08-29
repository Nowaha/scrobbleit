import { LastFmRecentTrack } from "../../api/lastfm/generic";

type RecentTrackProps = {
  track: LastFmRecentTrack;
};

const RecentTrack = ({
  track: {
    name,
    url,
    image,
    artist: { "#text": artist },
    date: { "#text": date },
  },
}: RecentTrackProps) => (
  <div class="flex items-center gap-2 rounded-md p-2 hover:bg-ctp-surface0">
    <img class="size-10 rounded-md" src={image[2]["#text"]} />
    <div class="flex flex-col">
      <div class="flex items-center gap-1">
        <a class="text-sm font-bold text-ctp-text hover:text-ctp-mauve hover:underline" href={url} target="_blank">
          {name}
        </a>
        <span>-</span>
        <a
          class="text-sm text-ctp-subtext0 hover:text-ctp-mauve hover:underline"
          href={`https://www.last.fm/music/${artist}`}
          target="_blank"
        >
          {artist}
        </a>
      </div>
      <span class="text-xs text-ctp-subtext1">{date}</span>
    </div>
  </div>
);

export default RecentTrack;
