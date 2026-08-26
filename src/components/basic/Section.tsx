import Icon from "./Icon.js";
import Spacer from "./Spacer.js";

type SectionProps = {
  id: string;
  icon: string;
  title: string;
  description: string;
  children: HTMLElement | HTMLElement[];
};

const Section = (props: SectionProps) => (
  <section id={props.id}>
    <h3 class="flex items-center gap-2 text-2xl font-bold text-ctp-text">
      <Icon icon={props.icon} />
      {props.title}
    </h3>
    <Spacer size="sm" />
    <p class="text-ctp-subtext0">{props.description}</p>
    <Spacer />
    {props.children}
  </section>
);

export default Section;
