type Variant = "primary" | "secondary" | "transparent";

type ButtonProps = {
  variant: Variant;
} & JSX.IntrinsicElements["button"];

const classes: Record<Variant, string> = {
  primary: "bg-ctp-mauve text-ctp-base border-2 border-ctp-mauve hover:bg-ctp-base hover:text-ctp-mauve",
  secondary: "bg-ctp-base text-ctp-text border border-ctp-subtext0 hover:bg-ctp-surface0",
  transparent: "", // TODO
};

const Button = ({ variant, ...rest }: ButtonProps) => {
  return (
    <button class={`block w-fit rounded-lg px-3 py-1.5 transition-colors duration-100 ${classes[variant]}`} {...rest} />
  );
};

export default Button;
