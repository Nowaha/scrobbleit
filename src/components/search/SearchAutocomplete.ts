import { fetchImageUrl } from "../../api/iTunes.js";
import { createRecommendationElement } from "../../util/elements.js";
import h from "../../util/h.js";
import { createEffect, Signal } from "../../util/state.js";
import { SearchResult } from "./SearchInput.js";

type SearchAutocompleteProps = {
  id: string;
  results: Signal<SearchResult[]>;
  onItemsChanged?: (
    items: {
      data: SearchResult;
      element: HTMLElement;
    }[],
  ) => void;
};

const SearchAutocomplete = (props: SearchAutocompleteProps) => {
  const container = h("div", {
    id: props.id,
    role: "listbox",
  });

  createEffect(() => {
    const results = props.results();
    container.replaceChildren(); // Fast native clear

    const items = results.map((result) => {
      const itemElement = createRecommendationElement(
        result.artist,
        result.name,
        result.listeners,
        () => fetchImageUrl(result.artist, result.name),
      );
      return { data: result, element: itemElement };
    });

    items.forEach(({ element }) => container.appendChild(element));
    props.onItemsChanged?.(items);
  });

  return container;
};

export default SearchAutocomplete;
