import { createEffect, createResource, createSignal, on, untrack, type JSX } from "solid-js";
import { debounce } from "../../../../util/util.ts";
import Field from "../../../basic/Field.tsx";
import AutocompleteSuggestions from "./AutocompleteSuggestion.tsx";
import AutocompleteTrigger from "./AutocompleteTrigger.tsx";

type AutocompleteInputProps<T> = {
  id: string;
  label: string;
  required?: boolean;
  placeholder: string;
  error?: string;
  value: string;
  disabled?: boolean;
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
  const [dismissed, setDismissed] = createSignal(false);
  const [activeIndex, setActiveIndex] = createSignal(-1);

  let skipNextValueChange = false;

  const [query, setQuery] = createSignal(untrack(() => props.value.trim()));
  const setQueryDebounced = debounce((value: string) => setQuery(value), 300);
  createEffect(
    on(
      () => props.value.trim(),
      (value) => {
        if (skipNextValueChange) {
          skipNextValueChange = false;
          return;
        }
        setQueryDebounced(value);
      },
      { defer: true },
    ),
  );

  const [searchResults] = createResource(
    () => ({ q: query() }),
    async ({ q }) => {
      if (!q) return [];
      try {
        return await props.search(q);
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    { initialValue: [] },
  );

  const results = () => searchResults.latest;
  const open = () => isFocused() && !dismissed() && results().length > 0;

  createEffect(on(results, () => setActiveIndex(-1)));

  const select = (index: number) => {
    const result = results()[index];
    if (result === undefined) return;
    skipNextValueChange = true;
    props.onResultSelected?.(result);
    setDismissed(true);
  };

  const handleInput = (value: string) => {
    setDismissed(false);
    props.onInput(value);
  };

  const handleFocusChange = (focused: boolean) => {
    setIsFocused(focused);
    if (focused) setDismissed(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const count = results().length;
    if (count === 0) return;

    if (!open()) {
      if (e.key === "ArrowDown" && isFocused()) {
        e.preventDefault();
        setDismissed(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, count - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        if (activeIndex() >= 0) {
          e.preventDefault();
          select(activeIndex());
        }
        break;
      case "Escape":
        e.preventDefault();
        setDismissed(true);
        break;
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
        disabled={props.disabled}
        expanded={open()}
        activeDescendant={open() && activeIndex() >= 0 ? optionId(activeIndex()) : undefined}
        onInput={handleInput}
        onFocusChange={handleFocusChange}
        onKeyDown={onKeyDown}
      />
      <AutocompleteSuggestions
        id={listboxId()}
        visible={open()}
        results={results()}
        loading={searchResults.loading}
        activeIndex={activeIndex()}
        optionId={optionId}
        renderItem={props.renderItem}
        onSelect={select}
        onHover={setActiveIndex}
      />
    </Field>
  );
};

export default AutocompleteInput;
