import type { VoidComponent } from "solid-js";
import Field from "./basic/Field.js";
import TextInput from "./basic/input/TextInput.js";

type ControlledInputProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onInput: (value: string) => void;
  ref?: (el: HTMLInputElement) => void;
};

const ControlledInput: VoidComponent<ControlledInputProps> = (props) => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
  };

  return (
    <Field
      label={props.label}
      disabled={props.disabled}
      inputId={props.id}
      required={props.required}
      error={props.error}
    >
      <TextInput
        id={props.id}
        value={props.value}
        error={props.error}
        required={props.required}
        disabled={props.disabled}
        placeholder={props.placeholder ?? ""}
        onInput={(e) => props.onInput(e.currentTarget.value)}
        onKeyDown={onKeyDown}
        ref={props.ref}
      />
    </Field>
  );
};

export default ControlledInput;
