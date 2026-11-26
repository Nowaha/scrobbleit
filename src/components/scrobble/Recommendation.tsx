import { createResource, Match, Show, Switch, type VoidComponent } from "solid-js";
import { numberFormat } from "../../util/util.ts";
import Icon from "../basic/Icon.tsx";
import SpinningCircle from "../basic/SpinningCircle.tsx";

type RecommendationProps = {
  artist: string;
  track: string;
  listeners: number;
  imageUrlFetcher: () => Promise<string | undefined>;
};

const Recommendation: VoidComponent<RecommendationProps> = (props) => {
  const [imageUrl] = createResource(() => props.imageUrlFetcher().catch(() => undefined));

  return (
    <div class="flex items-center justify-center gap-2 p-2 text-sm text-ctp-mauve">
      <div class="flex size-7.5 shrink-0 items-center justify-center rounded-lg">
        <Switch fallback={<Icon class="text-ctp-subtext0" icon="fa-music" />}>
          <Match when={imageUrl.loading}>
            <SpinningCircle />
          </Match>
          <Match when={imageUrl()}>{(src) => <img width={30} height={30} src={src()} class="rounded-lg" />}</Match>
        </Switch>
      </div>
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
