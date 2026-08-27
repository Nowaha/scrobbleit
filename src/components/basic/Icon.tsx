type IconProps = {
  class?: string;
  size?: string;
  icon: string;
};

const Icon = ({ class: cls, size, icon }: IconProps) => (
  <i class={`fa-solid ${icon} ${size ?? ""} ${cls ?? ""}`} aria-hidden="true"></i>
);

export default Icon;
