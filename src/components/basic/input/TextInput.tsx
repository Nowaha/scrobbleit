import { splitProps, VoidComponent } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

type TextInputProps = {
  id: string;
  class?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
} & Omit<JSX.IntrinsicElements["input"], "id" | "value" | "placeholder" | "required" | "disabled" | "class">;

const TextInput: VoidComponent<TextInputProps> = (rawProps) => {
  const [props, rest] = splitProps(rawProps, ["error", "class"]);
  return (
    <input
      type="text"
      class={`w-full rounded-md border px-3 py-2 text-ctp-text outline-none focus:border-ctp-mauve focus:ring-2 focus:ring-ctp-mauve`}
      classList={{
        "border-ctp-surface1": !props.error && !rest.disabled,
        "border-ctp-red": !!props.error && props.error.length > 0,
        "placeholder-ctp-text-overlay1 bg-ctp-surface0": !rest.disabled,
        "placeholder-ctp-text-overlay1 cursor-not-allowed border-ctp-surface0 bg-ctp-surface1": !!rest.disabled,
        [props.class!]: !!props.class,
      }}
      {...rest}
    />
  );
};

export default TextInput;
