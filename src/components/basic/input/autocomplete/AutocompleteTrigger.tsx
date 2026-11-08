import type { VoidComponent } from "solid-js";
import TextInput from "../TextInput.js";

export type AutocompleteTriggerProps = {
  id: string;
  listboxId: string;
  placeholder: string;
  required?: boolean;
  value: string;
  error?: string;
  expanded: boolean;
  activeDescendant?: string;
  onInput: (value: string) => void;
  onFocusChange: (focused: boolean) => void;
  onKeyDown: (e: KeyboardEvent) => void;
};

const AutocompleteTrigger: VoidComponent<AutocompleteTriggerProps> = (props) => (
  <TextInput
    id={props.id}
    type="text"
    role="combobox"
    autocomplete="off"
    placeholder={props.placeholder}
    aria-expanded={props.expanded}
    aria-haspopup="listbox"
    aria-autocomplete="list"
    aria-controls={props.listboxId}
    aria-activedescendant={props.activeDescendant}
    required={props.required}
    value={props.value}
    error={props.error}
    onInput={(e) => props.onInput(e.currentTarget.value)}
    onFocusIn={() => props.onFocusChange(true)}
    onFocusOut={() => props.onFocusChange(false)}
    onKeyDown={props.onKeyDown}
  />
);

export default AutocompleteTrigger;
