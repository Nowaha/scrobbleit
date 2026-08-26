type Size = "xs" | "sm" | "md" | "lg" | "xl";

type SpacerProps = {
  size?: Size;
};

const Spacer = ({ size = "md" }: SpacerProps) => (
  <div
    class="block"
    classList={{
      "h-0.5": size === "xs",
      "h-1": size === "sm",
      "h-2": size === "md",
      "h-4": size === "lg",
      "h-8": size === "xl",
    }}
  ></div>
);

export default Spacer;
