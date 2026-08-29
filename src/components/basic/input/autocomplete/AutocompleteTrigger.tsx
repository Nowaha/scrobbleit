import { Signal } from "../../../../util/state.js";
import TextInput from "../TextInput.js";

export type AutocompleteTriggerProps<T> = {
  id: string;
  placeholder: string;
  results: Signal<T[]>;
  value: Signal<string>;
  error: Signal<string | undefined>;
  isFocused: Signal<boolean>;
};

const AutocompleteTrigger = <T,>(props: AutocompleteTriggerProps<T>) =>
  (
    <TextInput
      id={props.id}
      type="text"
      role="combobox"
      placeholder="Search"
      aria-expanded={() => (props.isFocused() && props.results().length > 0 ? "true" : "false")}
      aria-haspopup="listbox"
      aria-autocomplete="list"
      value={props.value}
      error={props.error}
      on={{
        focusin: () => props.isFocused.set(true),
        focusout: () => props.isFocused.set(false),
      }}
    />
  ) as HTMLInputElement;

export default AutocompleteTrigger;
