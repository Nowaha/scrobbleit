import { splitProps, type JSX, type VoidComponent } from "solid-js";
import { cx } from "../../../util/cx.ts";
import { fieldErrorId } from "../Field.tsx";

type TextInputProps = {
  id: string;
  class?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "placeholder" | "required" | "disabled" | "class">;

const TextInput: VoidComponent<TextInputProps> = (rawProps) => {
  const [props, rest] = splitProps(rawProps, ["error", "class"]);
  const hasError = (): boolean => !!props.error;

  return (
    <input
      type="text"
      class={cx(
        "w-full rounded-md border px-3 py-2 text-ctp-text placeholder-ctp-overlay1 outline-none focus:border-ctp-mauve focus:ring-2 focus:ring-ctp-mauve",
        props.class,
      )}
      classList={{
        "border-ctp-surface1": !hasError() && !rest.disabled,
        "border-ctp-red": hasError(),
        "bg-ctp-surface0": !rest.disabled,
        "cursor-not-allowed border-ctp-surface0 bg-ctp-surface1": !!rest.disabled,
      }}
      aria-invalid={hasError() || undefined}
      aria-errormessage={hasError() ? fieldErrorId(rest.id) : undefined}
      {...rest}
    />
  );
};

export default TextInput;
