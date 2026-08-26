import { searchTrack } from "../../api/lastfm.js";
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

  createEffect(() => {
    doSearch(query());
  });

  const inputEl = (
    <input
      id={props.id}
      type="text"
      role="combobox"
      aria-expanded={() => (isFocused() && results().length > 0 ? "true" : "false")}
      aria-haspopup="listbox"
      aria-autocomplete="list"
      on={{
        focusin: () => isFocused.set(true),
        focusout: () => isFocused.set(false),
        input: (e: Event) => query.set((e.target as HTMLInputElement).value),
      }}
    />
  ) as HTMLInputElement;

  const recommendationsEl = SearchAutocomplete({
    id: "recommendations",
    results,
    onItemsChanged: (items) => {
      setupKeyboardNav(inputEl, items, props.onResultSelected);
    },
  });

  createEffect(() => {
    recommendationsEl.style.display = isFocused() ? "block" : "none";
  });

  return (
    <div class="field">
      <label class="label" aria-label="search">
        Search
      </label>
      {inputEl}
      {recommendationsEl}
    </div>
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
