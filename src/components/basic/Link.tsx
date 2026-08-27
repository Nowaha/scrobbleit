type LinkProps = JSX.IntrinsicElements["a"];

const Link = ({ class: cls, ...rest }: LinkProps) => (
  <a class={`text-ctp-mauve underline hover:no-underline ${cls ?? ""}`} {...rest} />
);

export default Link;
