import { Signal } from "../util/state.js";

type ControlledInputProps = {
  id: string;
  label: string;
  type?: string;
  value: Signal<string>;
  error: Signal<string | undefined>;
  required?: boolean;
  placeholder?: string | Signal<string>;
};

const ControlledInput = (props: ControlledInputProps): HTMLElement => {
  const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    props.value.set(val);
    if (props.error()) props.error.set(undefined);
  };

  return (
    <div class="field">
      <label htmlFor={props.id} class={props.required ? "required" : ""}>
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type ?? "text"}
        value={props.value}
        placeholder={props.placeholder ?? ""}
        class={() => (props.error() ? "error" : "")}
        on={{ input: handleInput }}
      />
      <span id={`${props.id}-error`} class={() => `error-message ${props.error() ? "" : "hidden"}`}>
        {() => props.error() ?? ""}
      </span>
    </div>
  );
};

export default ControlledInput;
