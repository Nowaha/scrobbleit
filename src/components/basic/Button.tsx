import { splitProps, type JSX, type ParentComponent } from "solid-js";

type Variant = "primary" | "secondary" | "transparent";

type ButtonProps = {
  variant: Variant;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const classes: Record<Variant, string> = {
  primary: "bg-ctp-mauve text-ctp-base border-2 border-ctp-mauve hover:bg-ctp-base hover:text-ctp-mauve",
  secondary: "bg-ctp-base text-ctp-text border border-ctp-subtext0 hover:bg-ctp-surface0",
  transparent: "", // TODO
};

const Button: ParentComponent<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant"]);
  return (
    <button
      class={`block h-fit w-fit rounded-lg px-3 py-1.5 transition-colors duration-100 ${classes[local.variant]} ${local.class ?? ""}`}
      {...rest}
    />
  );
};

export default Button;
