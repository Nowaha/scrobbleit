import { radioGroup } from "../../../../util/radio.js";
import { createEffect, createSignal, Signal } from "../../../../util/state.js";
import { debounce } from "../../../../util/util.js";
import Field from "../../../basic/Field.js";
import AutocompleteSuggestions from "./AutocompleteSuggestion.js";
import AutocompleteTrigger from "./AutocompleteTrigger.js";

type AutocompleteInputProps<T> = {
  id: string;
  label: string;
  required?: boolean;
  placeholder: string;
  value: Signal<string>;
  search: (query: string) => Promise<T[]>;
  buildElement: (result: T) => HTMLElement;
  onResultSelected?: (result: T) => void;
};

const AutocompleteInput = <T,>(props: AutocompleteInputProps<T>): HTMLElement => {
  const error = createSignal<string | undefined>(undefined);
  const results = createSignal<T[]>([]);
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
      const result = await props.search(currentQuery);
      results.set(result);
    } catch (e) {
      console.error(e);
    } finally {
      busy = false;
    }
  }, 300);

  createEffect(() => {
    doSearch(props.value());
  });

  let keydownCleanup: (() => void) | null = null;
  const setupKeyboardNav = <T,>(
    input: HTMLInputElement,
    items: { data: T; element: HTMLElement }[],
    onSelect?: (result: T) => void,
  ) => {
    keydownCleanup?.();
    if (items.length === 0) return;

    const group = radioGroup(input, items, onSelect);

    const onKeydown = (e: KeyboardEvent) => {
      console.log("keydown", e.key);
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

  const inputEl = (
    <AutocompleteTrigger
      id={`${props.id}-trigger`}
      value={props.value}
      error={error}
      isFocused={isFocused}
      placeholder={props.placeholder}
      required={props.required}
      results={results}
    />
  ) as HTMLInputElement;

  return (
    <Field class="relative" label={props.label} inputId={`${props.id}-trigger`} required={props.required} error={error}>
      {inputEl}
      <AutocompleteSuggestions
        id={`${props.id}-autocomplete`}
        visible={isFocused}
        results={results}
        buildElement={props.buildElement}
        onItemsChanged={(items) => {
          setupKeyboardNav(inputEl, items, props.onResultSelected);
        }}
      />
    </Field>
  );
};

export default AutocompleteInput;
