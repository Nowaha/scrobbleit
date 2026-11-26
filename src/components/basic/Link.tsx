import { splitProps, type JSX, type ParentComponent } from "solid-js";
import { cx } from "../../util/cx.ts";

type LinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: ParentComponent<LinkProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <a class={cx("text-ctp-mauve underline hover:no-underline", local.class)} {...rest} />;
};

export default Link;
