import { mergeProps, type JSX, type ParentComponent } from "solid-js";
import Icon from "./Icon.js";
import Spacer from "./Spacer.js";

type SectionProps = {
  id: string;
  icon: string;
  title: JSX.Element;
  titleSize?: string;
  titleColor?: string;
  description: JSX.Element;
  descriptionSize?: string;
  descriptionColor?: string;
};

const Section: ParentComponent<SectionProps> = (rawProps) => {
  const props = mergeProps(
    {
      titleSize: "text-2xl",
      titleColor: "text-ctp-text",
      descriptionSize: "text-md",
      descriptionColor: "text-ctp-subtext0",
    },
    rawProps,
  );

  return (
    <section id={props.id}>
      <h3 class={`flex items-center gap-2 ${props.titleSize} font-bold ${props.titleColor}`}>
        <Icon icon={props.icon} />
        {props.title}
      </h3>
      <Spacer size="sm" />
      <p class={`${props.descriptionSize} ${props.descriptionColor}`}>{props.description}</p>
      <Spacer />
      {props.children}
    </section>
  );
};

export default Section;
