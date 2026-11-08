import Link from "../basic/Link.tsx";
import Section from "../basic/Section.tsx";

const InfoSection = () => (
  <Section
    id="info"
    icon="fa-heart"
    title="Hello & Welcome!"
    titleSize="text-3xl"
    titleColor="text-ctp-mauve"
    description={
      <span>
        ... to my nifty lil'{" "}
        <Link href="https://last.fm/" target="_blank">
          Last.fm
        </Link>{" "}
        scrobbler!
      </span>
    }
    descriptionSize="text-lg"
  >
    <p>How are youu?</p>
  </Section>
);

export default InfoSection;
