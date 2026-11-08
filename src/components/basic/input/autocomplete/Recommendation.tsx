import { createResource, Show, type VoidComponent } from "solid-js";
import { numberFormat } from "../../../../util/util.js";

type RecommendationProps = {
  artist: string;
  track: string;
  listeners: number;
  imageUrlFetcher: () => Promise<string>;
};

const Recommendation: VoidComponent<RecommendationProps> = (props) => {
  const [imageUrl] = createResource(() => props.imageUrlFetcher().catch(() => undefined));

  return (
    <div class="recommendation flex items-center justify-center gap-2 p-2 text-sm text-ctp-mauve">
      <Show
        when={imageUrl.latest}
        fallback={
          <div class="flex h-7.5 w-7.5 items-center justify-center rounded-lg">
            <div class="cpi h-4 w-4" />
          </div>
        }
      >
        {(src) => <img width={30} height={30} src={src()} class="rounded-lg" />}
      </Show>
      <div class="flex grow flex-col justify-center">
        <Show when={props.track}>
          <span>{props.track}</span>
        </Show>
        <Show when={props.artist}>
          <span class="text-xs font-normal text-ctp-mauve-900">{props.artist}</span>
        </Show>
      </div>
      <span class="ml-2 text-xs text-ctp-subtext0">{numberFormat.format(props.listeners)}</span>
    </div>
  );
};

export default Recommendation;
