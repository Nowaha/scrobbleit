import Icon from "./Icon.js";
import Spacer from "./Spacer.js";

type SectionProps = {
  id: string;
  icon: string;
  title: HTMLElement | string;
  titleSize?: string;
  titleColor?: string;
  description: HTMLElement | string;
  descriptionSize?: string;
  descriptionColor?: string;
  children: HTMLElement | HTMLElement[];
};

const Section = ({
  id,
  icon,
  title,
  titleSize = "text-2xl",
  titleColor = "text-ctp-text",
  description,
  descriptionSize = "text-md",
  descriptionColor = "text-ctp-subtext0",
  children,
}: SectionProps) => (
  <section id={id}>
    <h3 class={`flex items-center gap-2 ${titleSize} font-bold ${titleColor}`}>
      <Icon icon={icon} />
      {title}
    </h3>
    <Spacer size="sm" />
    <p class={`${descriptionSize} ${descriptionColor}`}>{description}</p>
    <Spacer />
    {children}
  </section>
);

export default Section;
