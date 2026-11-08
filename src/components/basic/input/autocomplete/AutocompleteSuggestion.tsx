import { For, type JSX } from "solid-js";

type AutocompleteSuggestionsProps<T> = {
  id: string;
  visible: boolean;
  results: T[];
  activeIndex: number;
  optionId: (index: number) => string;
  renderItem: (result: T) => JSX.Element;
  onSelect: (index: number) => void;
};

const AutocompleteSuggestions = <T,>(props: AutocompleteSuggestionsProps<T>) => (
  <div
    id={props.id}
    role="listbox"
    class="absolute top-full z-10 flex flex-col gap-0.5 rounded-sm bg-ctp-surface0"
    classList={{ hidden: !props.visible }}
  >
    <For each={props.results}>
      {(result, i) => (
        <div
          id={props.optionId(i())}
          role="option"
          aria-selected={i() === props.activeIndex}
          class="cursor-pointer first:rounded-t-lg last:rounded-b-lg hover:bg-ctp-surface1 aria-selected:bg-ctp-surface1 aria-selected:outline-1 aria-selected:outline-ctp-mauve"
          // Keep focus on the input while clicking an option.
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => props.onSelect(i())}
        >
          {props.renderItem(result)}
        </div>
      )}
    </For>
  </div>
);

export default AutocompleteSuggestions;
