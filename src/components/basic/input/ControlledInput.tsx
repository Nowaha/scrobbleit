import type { VoidComponent } from "solid-js";
import Field from "../Field.tsx";
import TextInput from "./TextInput.tsx";

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

const ControlledInput: VoidComponent<ControlledInputProps> = (props) => (
  <Field label={props.label} inputId={props.id} required={props.required} error={props.error}>
    <TextInput
      id={props.id}
      value={props.value}
      error={props.error}
      required={props.required}
      disabled={props.disabled}
      placeholder={props.placeholder ?? ""}
      onInput={(e) => props.onInput(e.currentTarget.value)}
      ref={props.ref}
    />
  </Field>
);

export default ControlledInput;
