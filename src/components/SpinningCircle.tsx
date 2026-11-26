import { mergeProps, VoidComponent } from "solid-js";

type Size = "sm" | "md" | "lg" | "xl";

type SpinningCircleProps = {
  class?: string;
  size?: Size;
};

const SpinningCircle: VoidComponent<SpinningCircleProps> = (rawProps: SpinningCircleProps) => {
  const props = mergeProps({ variant: "normal", size: "md" }, rawProps);

  return (
    <div
      class={`animate-spin rounded-full border-2 border-ctp-surface1 border-t-ctp-mauve ${props.class ?? ""}`}
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
