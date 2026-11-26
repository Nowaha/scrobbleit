import { mergeProps, type VoidComponent } from "solid-js";
import { cx } from "../../util/cx.ts";

type Size = "sm" | "md" | "lg" | "xl";

type SpinningCircleProps = {
  class?: string;
  size?: Size;
};

const SpinningCircle: VoidComponent<SpinningCircleProps> = (rawProps) => {
  const props = mergeProps({ size: "md" as Size }, rawProps);

  return (
    <div
      class={cx("animate-spin rounded-full border-2 border-ctp-surface1 border-t-ctp-mauve", props.class)}
      classList={{
        "size-3": props.size === "sm",
        "size-4": props.size === "md",
        "size-5": props.size === "lg",
        "size-6": props.size === "xl",
      }}
    />
  );
};

export default SpinningCircle;
