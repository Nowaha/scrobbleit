import { mergeProps, type VoidComponent } from "solid-js";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

type SpacerProps = {
  size?: Size;
};

const Spacer: VoidComponent<SpacerProps> = (rawProps) => {
  const props = mergeProps({ size: "md" as Size }, rawProps);
  return (
    <div
      class="block"
      classList={{
        "h-0.5": props.size === "xs",
        "h-1": props.size === "sm",
        "h-2": props.size === "md",
        "h-4": props.size === "lg",
        "h-8": props.size === "xl",
      }}
    ></div>
  );
};

export default Spacer;
