import { fetchImageUrl } from "../../api/iTunes.js";
import { createEffect, Signal } from "../../util/state.js";
import Recommendation from "./Recommendation.js";
import { SearchResult } from "./SearchInput.js";

type SearchAutocompleteProps = {
  id: string;
  visible: Signal<boolean>;
  results: Signal<SearchResult[]>;
  onItemsChanged?: (
    items: {
      data: SearchResult;
      element: HTMLElement;
    }[],
  ) => void;
};

const SearchAutocomplete = (props: SearchAutocompleteProps) => {
  let container = (
    <div id={props.id} role="listbox" class="absolute top-full z-10 flex flex-col gap-0.5 rounded-sm bg-ctp-surface0" />
  );

  createEffect(() => {
    if (props.visible()) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  });

  createEffect(() => {
    const results = props.results();
    container.replaceChildren();

    const items = results.map((result) => {
      const itemElement = (
        <Recommendation
          artist={result.artist}
          track={result.name}
          listeners={result.listeners}
          imageUrlFetcher={() => fetchImageUrl(result.artist, result.name)}
        />
      ) as HTMLElement;
      return { data: result, element: itemElement };
    });

    items.forEach(({ element }) => container.appendChild(element));
    props.onItemsChanged?.(items);
  });

  return container;
};

export default SearchAutocomplete;
