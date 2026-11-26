import { mergeProps, type JSX, type ParentComponent } from "solid-js";
import { cx } from "../../util/cx.ts";
import Icon from "./Icon.tsx";

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
      <h3 class={cx("flex items-center gap-2 font-bold", props.titleSize, props.titleColor)}>
        <Icon icon={props.icon} />
        {props.title}
      </h3>
      <p class={cx("mt-1 mb-2", props.descriptionSize, props.descriptionColor)}>{props.description}</p>
      {props.children}
    </section>
  );
};

export default Section;
