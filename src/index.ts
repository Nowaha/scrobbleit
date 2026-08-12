import { fetchImageUrl } from "./api/iTunes.js";
import { searchTrack } from "./api/lastfm.js";
import {
  byId,
  createRecommendationElement,
  withState,
} from "./util/elements.js";
import { createInputFocusGroup, focusNext } from "./util/focus.js";
import { radioGroup } from "./util/radio.js";
import { useState } from "./util/state.js";
import { debounce } from "./util/util.js";

type SearchResult = {
  name: string;
  artist: string;
  listeners: number;
};

const main = async () => {
  const searchSection = byId<HTMLElement>("searchSection");
  const manualSection = byId<HTMLElement>("manualSection");
  const recommendations = byId<HTMLFieldSetElement>("recommendations");
  const scrobbleButton = byId<HTMLButtonElement>("scrobble");
  const inputs = {
    search: withState("search"),
    manual: {
      track: withState("trackName"),
      artist: withState("artistName"),
      album: withState("albumName"),
      albumArtist: withState("albumArtist"),
    },
  };

  const searchResults = useState<SearchResult[]>([]);

  createInputFocusGroup(manualSection);

  inputs.manual.artist.listen((value) => {
    inputs.manual.albumArtist.element.placeholder = value;
  });

  inputs.search.element.addEventListener("focusin", () => {
    inputs.search.element.setAttribute(
      "aria-expanded",
      searchResults.get().length > 0 ? "true" : "false",
    );
    recommendations.style.display = "block";
  });
  inputs.search.element.addEventListener("focusout", () => {
    inputs.search.element.setAttribute("aria-expanded", "false");
    recommendations.style.display = "none";
  });

  const selectTrack = (track: { name: string; artist: string }) => {
    inputs.manual.track.setValue(track.name);
    inputs.manual.artist.setValue(track.artist);
    inputs.manual.album.setValue("");
    inputs.manual.albumArtist.setValue("");

    setTimeout(() => {
      inputs.manual.track.element.focus();
    });
  };

  let abortNav: (() => void) | null = null;
  searchResults.listen(async (results) => {
    recommendations.innerHTML = "";
    inputs.search.element.setAttribute(
      "aria-expanded",
      results.length > 0 ? "true" : "false",
    );

    const items = results.map((result) => ({
      data: result,
      element: createRecommendationElement(
        result.artist,
        result.name,
        result.listeners,
        () => fetchImageUrl(result.artist, result.name),
      ),
    }));

    items.forEach(({ element }) => recommendations.appendChild(element));

    const group = radioGroup(inputs.search.element, items, selectTrack);

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        group.next();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        group.prev();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        group.select();
      }
    };

    inputs.search.element.addEventListener("keydown", onKeydown);
    abortNav = () =>
      inputs.search.element.removeEventListener("keydown", onKeydown);
  });

  let busy = false;
  const search = debounce(async (...args: unknown[]) => {
    if (busy) return;

    const value = args[0] as string;
    if (value.trim() === "") {
      searchResults.set([]);
      return;
    }

    busy = true;
    try {
      const response = await searchTrack(value);
      const tracks = response.results.trackmatches.track.slice(0, 5);
      const asResults = tracks.map((t: any): SearchResult => ({
        name: t.name,
        artist: t.artist,
        listeners: t.listeners,
      }));
      searchResults.set(asResults);
    } catch (e) {
      console.error(e);
    } finally {
      busy = false;
    }
  }, 300);

  inputs.search.listen(search);
};

document.addEventListener("DOMContentLoaded", main);
