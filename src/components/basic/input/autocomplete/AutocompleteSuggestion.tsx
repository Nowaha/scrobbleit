import { createEffect, For, type JSX } from "solid-js";

type AutocompleteSuggestionsProps<T> = {
  id: string;
  visible: boolean;
  results: T[];
  activeIndex: number;
  optionId: (index: number) => string;
  renderItem: (result: T) => JSX.Element;
  onSelect: (index: number) => void;
  onHover: (index: number) => void;
};

const AutocompleteSuggestions = <T,>(props: AutocompleteSuggestionsProps<T>) => {
  createEffect(() => {
    if (!props.visible || props.activeIndex < 0) return;
    document.getElementById(props.optionId(props.activeIndex))?.scrollIntoView({ block: "nearest" });
  });

  return (
    <div
      id={props.id}
      role="listbox"
      class="absolute top-full z-10 flex max-h-64 min-w-96 flex-col gap-0.5 overflow-y-auto rounded-sm bg-ctp-surface0 p-px"
      classList={{ hidden: !props.visible }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <For each={props.results}>
        {(result, i) => (
          <div
            id={props.optionId(i())}
            role="option"
            aria-selected={i() === props.activeIndex}
            class="cursor-pointer first:rounded-t-lg last:rounded-b-lg aria-selected:bg-ctp-surface1 aria-selected:outline-1 aria-selected:outline-ctp-mauve"
            onMouseMove={() => props.onHover(i())}
            onClick={() => props.onSelect(i())}
          >
            {props.renderItem(result)}
          </div>
        )}
      </For>
    </div>
  );
};

export default AutocompleteSuggestions;
