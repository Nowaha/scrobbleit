import { Signal } from "../util/state.js";
import Field from "./basic/Field.js";
import TextInput from "./basic/input/TextInput.js";

type ControlledInputProps = {
  id: string;
  label: string;
  type?: string;
  value: Signal<string>;
  error: Signal<string | undefined>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string | Signal<string>;
};

const ControlledInput = (props: ControlledInputProps): HTMLElement => {
  const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    props.value.set(val);
    if (props.error()) props.error.set(undefined);
  };

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
        disabled={props.disabled}
        placeholder={props.placeholder ?? ""}
        onInput={handleInput}
        on={{ keydown: onKeyDown }}
      />
    </Field>
  );
};

export default ControlledInput;
