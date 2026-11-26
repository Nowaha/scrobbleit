import { Show, splitProps, type JSX, type ParentComponent } from "solid-js";
import { cx } from "../../util/cx.ts";
import SpinningCircle from "./SpinningCircle.tsx";

type Variant = "primary" | "secondary" | "transparent";

type ButtonProps = {
  variant: Variant;
  loading?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const classes: Record<Variant, string> = {
  primary:
    "bg-ctp-mauve text-ctp-base border-2 border-ctp-mauve hover:bg-ctp-base hover:text-ctp-mauve disabled:bg-ctp-surface0 disabled:border-ctp-surface1 disabled:text-ctp-subtext0",
  secondary:
    "bg-ctp-base text-ctp-text border border-ctp-subtext0 hover:bg-ctp-surface0 disabled:bg-ctp-surface0 disabled:border-ctp-surface1 disabled:text-ctp-subtext0",
  transparent: "", // TODO
};

const Button: ParentComponent<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "loading", "children"]);

  return (
    <button
      class={cx(
        "flex h-fit w-fit flex-row items-center gap-1 rounded-lg px-3 py-1.5 transition-colors duration-100 disabled:cursor-not-allowed",
        classes[local.variant],
        local.class,
      )}
      {...rest}
    >
      <Show when={local.loading}>
        <SpinningCircle size="md" />
      </Show>
      {local.children}
    </button>
  );
};

export default Button;
