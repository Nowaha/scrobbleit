import { createEffect, Signal } from "../../../../util/state.js";

type ResultItem<T> = {
  data: T;
  element: HTMLElement;
};

type AutocompleteSuggestionsProps<T> = {
  id: string;
  visible: Signal<boolean>;
  results: Signal<T[]>;
  buildElement: (result: T) => HTMLElement;
  onItemsChanged?: (items: ResultItem<T>[]) => void;
};

const AutocompleteSuggestions = <T,>(props: AutocompleteSuggestionsProps<T>) => {
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

    const items: ResultItem<T>[] = results.map((result: T) => ({ data: result, element: props.buildElement(result) }));
    items.forEach((item) => container.appendChild(item.element));
    props.onItemsChanged?.(items);
  });

  return container;
};

export default AutocompleteSuggestions;
