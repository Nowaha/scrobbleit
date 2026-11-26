import type { JSX } from "solid-js";

const NowPlayingBars = (): JSX.Element => (
  <div class="flex size-2.5 items-end justify-between" aria-hidden="true">
    <div class="h-0.5 w-0.5 animate-equalizer rounded-lg bg-ctp-subtext0" />
    <div class="h-0.5 w-0.5 animate-equalizer rounded-lg bg-ctp-subtext0 [animation-delay:0.4s] [animation-duration:0.6s]" />
    <div class="h-0.5 w-0.5 animate-equalizer rounded-lg bg-ctp-subtext0 [animation-delay:0.3s]" />
  </div>
);

export default NowPlayingBars;
