import type { VoidComponent } from "solid-js";

type IconProps = {
  class?: string;
  size?: string;
  icon: string;
};

const Icon: VoidComponent<IconProps> = (props) => (
  <i class={`fa-solid ${props.icon} ${props.size ?? ""} ${props.class ?? ""}`} aria-hidden="true"></i>
);

export default Icon;
