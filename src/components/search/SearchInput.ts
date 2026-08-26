import { searchTrack } from "../../api/lastfm.js";
import { h } from "../../util/h.js";
import { radioGroup } from "../../util/radio.js";
import { createEffect, createSignal } from "../../util/state.js";
import { debounce } from "../../util/util.js";
import SearchAutocomplete from "./SearchAutocomplete.js";

export type SearchResult = {
  name: string;
  artist: string;
  listeners: number;
};

type SearchInputProps = {
  id: string;
  onResultSelected?: (result: SearchResult) => void;
};

const SearchInput = (props: SearchInputProps): HTMLElement => {
  const query = createSignal("");
  const results = createSignal<SearchResult[]>([]);
  const isFocused = createSignal(false);

  // Debounced API search worker bound directly to the `query` signal
  let busy = false;
  const doSearch = debounce(async (currentQuery: string) => {
    if (busy) return;
    if (!currentQuery.trim()) {
      results.set([]);
      return;
    }

    busy = true;
    try {
      const response = await searchTrack(currentQuery);
      const tracks = response.results.trackmatches.track.slice(0, 5);
      const asResults: SearchResult[] = tracks.map((t: any) => ({
        name: t.name,
        artist: t.artist,
        listeners: Number(t.listeners),
      }));
      results.set(asResults);
    } catch (e) {
      console.error(e);
    } finally {
      busy = false;
    }
  }, 300);

  // Trigger search whenever `query` updates
  createEffect(() => {
    doSearch(query());
  });

  // Direct reference to input node
  const inputEl = h("input", {
    id: props.id,
    type: "text",
    role: "combobox",
    ariaExpanded: () =>
      isFocused() && results().length > 0 ? "true" : "false",
    ariaHasPopup: "listbox",
    ariaAutoComplete: "list",
    on: {
      focusin: () => isFocused.set(true),
      focusout: () => isFocused.set(false),
      input: (e: Event) => query.set((e.target as HTMLInputElement).value),
    },
  }) as HTMLInputElement;

  const recommendationsEl = SearchAutocomplete({
    id: "recommendations",
    results,
    onItemsChanged: (items) => {
      setupKeyboardNav(inputEl, items, props.onResultSelected);
    },
  });

  // Reactively toggle dropdown visibility without manual DOM queries
  createEffect(() => {
    recommendationsEl.style.display = isFocused() ? "block" : "none";
  });

  return h(
    "div",
    { class: "field" },
    h("label", { class: "label", ariaLabel: "search" }, "Search"),
    inputEl,
    recommendationsEl,
  );
};

let keydownCleanup: (() => void) | null = null;
const setupKeyboardNav = (
  input: HTMLInputElement,
  items: { data: SearchResult; element: HTMLElement }[],
  onSelect?: (result: SearchResult) => void,
) => {
  keydownCleanup?.();
  if (items.length === 0) return;

  const group = radioGroup(input, items, onSelect);

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      group.next();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      group.prev();
    } else if (e.key === "Enter") {
      e.preventDefault();
      group.select();
    }
  };

  input.addEventListener("keydown", onKeydown);
  keydownCleanup = () => input.removeEventListener("keydown", onKeydown);
};

export default SearchInput;
