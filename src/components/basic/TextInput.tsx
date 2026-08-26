import { Signal } from "../../util/state";

type TextInputProps = {
  id: string;
  class?: string;
  value: Signal<string>;
  required?: boolean;
  placeholder?: Signal<string> | string;
  error: Signal<string | undefined>;
  disabled?: boolean;
  onInput?: (event: Event) => void;
} & Omit<
  JSX.IntrinsicElements["input"],
  "id" | "value" | "placeholder" | "required" | "disabled" | "onInput" | "class"
>;

const TextInput = ({
  id,
  class: cls,
  value,
  required,
  placeholder,
  error,
  disabled,
  onInput,
  on,
  ...rest
}: TextInputProps) => {
  const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    value.set(val);
    if (error()) error.set(undefined);
    onInput?.(e);
  };

  return (
    <input
      id={id}
      type="text"
      class={() =>
        `placeholder-ctp-text-overlay1 w-full rounded-md border bg-ctp-surface0 px-3 py-2 text-ctp-text outline-none focus:border-ctp-mauve focus:ring-2 focus:ring-ctp-mauve`
      }
      classList={{
        "border-ctp-surface1": () => !error(),
        "border-ctp-red": () => error(),
        [cls!]: cls,
      }}
      value={value}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      {...rest}
      on={{ ...on, input: handleInput }}
    />
  );
};

export default TextInput;
