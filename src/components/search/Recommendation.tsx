import { numberFormat, trackToId } from "../../util/util.js";

type RecommendationProps = {
  artist: string;
  track: string;
  listeners: number;
  imageUrlFetcher: () => Promise<string>;
};

const Recommendation = (props: RecommendationProps): HTMLElement => {
  const imagePlaceholder = (
    <div class="flex h-7.5 w-7.5 items-center justify-center rounded-lg">
      <div class="cpi h-4 w-4" />
    </div>
  ) as HTMLDivElement;

  props.imageUrlFetcher().then((imageUrl) => {
    const newImage = (<img width={30} height={30} src={imageUrl} class="rounded-lg" />) as HTMLImageElement;
    imagePlaceholder.replaceWith(newImage);
  });

  return (
    <div
      id={trackToId(props.track, props.artist)}
      class="recommendation flex items-center justify-center gap-2 p-2 text-sm text-ctp-mauve first:rounded-t-lg last:rounded-b-lg focus-within:bg-ctp-surface1 focus-within:outline-1 focus-within:outline-ctp-mauve hover:bg-ctp-surface1 aria-selected:bg-ctp-surface1 aria-selected:outline-1 aria-selected:outline-ctp-mauve"
      role="option"
      aria-selected="false"
    >
      {imagePlaceholder}
      <div class="flex grow flex-col justify-center">
        {props.track ? <span>{props.track}</span> : undefined}
        {props.artist ? <span class="text-xs font-normal text-ctp-mauve-900">{props.artist}</span> : undefined}
      </div>
      <span class="ml-2 text-xs text-ctp-subtext0">{numberFormat.format(props.listeners)}</span>
    </div>
  );
};

export default Recommendation;
