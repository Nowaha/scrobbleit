import type { JSX } from "solid-js";
import { getLastFmAuthUrl } from "../../api/lastfm/lastfm.ts";
import Icon from "../basic/Icon.tsx";

const LastFmButton = (): JSX.Element => (
  <button
    id="lastfmLogin"
    class="flex cursor-pointer items-center gap-2 rounded-lg border-3 border-[#D51007] bg-[#D51007] px-3 py-3 text-white shadow-md shadow-ctp-crust transition-colors duration-100 hover:bg-ctp-base"
    onClick={() => window.open(getLastFmAuthUrl(), "_self")?.focus()}
  >
    <Icon icon="fa-brands fa-lastfm" size="fa-xl" />
    Authorize with Last.fm
    <Icon icon="fa-external-link" size="fa-xs" />
  </button>
);

export default LastFmButton;
