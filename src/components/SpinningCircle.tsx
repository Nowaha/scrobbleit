import { mergeProps, VoidComponent } from "solid-js";

type SpinningCircleProps = {
  width?: string;
  height?: string;
};

const SpinningCircle: VoidComponent<SpinningCircleProps> = (rawProps: SpinningCircleProps) => {
  const props = mergeProps(rawProps, { width: "w-4", height: "h-4" });
  return (
    <div
      class={`${props.width} ${props.height} animate-spin rounded-full border-2 border-ctp-surface1 border-t-ctp-mauve`}
    />
  );
};

export default SpinningCircle;
