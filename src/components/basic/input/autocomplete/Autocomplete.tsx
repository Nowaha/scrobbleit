import { createEffect, createResource, createSignal, on, type JSX } from "solid-js";
import { debounce } from "../../../../util/util.js";
import Field from "../../../basic/Field.js";
import AutocompleteSuggestions from "./AutocompleteSuggestion.js";
import AutocompleteTrigger from "./AutocompleteTrigger.js";

type AutocompleteInputProps<T> = {
  id: string;
  label: string;
  required?: boolean;
  placeholder: string;
  error?: string;
  value: string;
  onInput: (value: string) => void;
  search: (query: string) => Promise<T[]>;
  renderItem: (result: T) => JSX.Element;
  onResultSelected?: (result: T) => void;
};

const AutocompleteInput = <T,>(props: AutocompleteInputProps<T>) => {
  const triggerId = () => `${props.id}-trigger`;
  const listboxId = () => `${props.id}-autocomplete`;
  const optionId = (index: number) => `${props.id}-option-${index}`;

  const [isFocused, setIsFocused] = createSignal(false);
  const [activeIndex, setActiveIndex] = createSignal(0);

  const [query, setQuery] = createSignal(props.value.trim());
  const setQueryDebounced = debounce(setQuery, 300);
  createEffect(on(() => props.value.trim(), (value) => setQueryDebounced(value), { defer: true }));

  const [searchResults] = createResource(
    query,
    async (q) => {
      try {
        return await props.search(q);
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    { initialValue: [] },
  );

  // An empty query yields no source, so the resource keeps its last value; hide it explicitly.
  const results = () => (query() ? searchResults.latest : []);
  const open = () => isFocused() && results().length > 0;

  createEffect(on(results, () => setActiveIndex(0)));

  const select = (index: number) => {
    const result = results()[index];
    if (result !== undefined) props.onResultSelected?.(result);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const count = results().length;
    if (count === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, count - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(activeIndex());
    }
  };

  return (
    <Field class="relative" label={props.label} inputId={triggerId()} required={props.required} error={props.error}>
      <AutocompleteTrigger
        id={triggerId()}
        listboxId={listboxId()}
        value={props.value}
        error={props.error}
        placeholder={props.placeholder}
        required={props.required}
        expanded={open()}
        activeDescendant={open() ? optionId(activeIndex()) : undefined}
        onInput={props.onInput}
        onFocusChange={setIsFocused}
        onKeyDown={onKeyDown}
      />
      <AutocompleteSuggestions
        id={listboxId()}
        visible={isFocused()}
        results={results()}
        activeIndex={activeIndex()}
        optionId={optionId}
        renderItem={props.renderItem}
        onSelect={select}
      />
    </Field>
  );
};

export default AutocompleteInput;
