type LinkProps = JSX.IntrinsicElements["a"];

const Link = ({ cls, ...rest }: LinkProps) => (
  <a class="text-ctp-mauve underline hover:no-underline" classList={{ [cls!]: cls }} {...rest} />
);

export default Link;
