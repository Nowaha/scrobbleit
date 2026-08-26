type IconProps = {
  icon: string;
};

const Icon = (props: IconProps) => <i class={`fa-solid ${props.icon}`} aria-hidden="true"></i>;

export default Icon;
