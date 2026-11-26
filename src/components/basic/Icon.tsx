import type { VoidComponent } from "solid-js";
import { cx } from "../../util/cx.ts";

type IconProps = {
  class?: string;
  size?: string;
  icon: string;
};

const Icon: VoidComponent<IconProps> = (props) => (
  <i class={cx("fa-solid", props.icon, props.size, props.class)} aria-hidden="true" />
);

export default Icon;
