import Link from "../basic/Link.js";
import Section from "../basic/Section.js";
import Spacer from "../basic/Spacer.js";
import LastFmButton from "./LastFmButton.js";

const LoginSection = () => (
  <Section
    id="loginSection"
    icon="fa-key"
    title="Log in"
    description={
      <span>
        Before you can make use of the web app, you have to log into your{" "}
        <Link href="https://last.fm/" target="_blank">
          Last.fm
        </Link>{" "}
        account to start scrobbling! Logging in is <span class="text-ctp-text">securely</span> done{" "}
        <span class="text-ctp-text">externally</span> through Last.fm's own website.
      </span>
    }
  >
    <Spacer />
    <p class="text-ctp-mauve">Please click the button below to go to Last.fm's website and authorize yourself.</p>
    <Spacer size="lg" />
    <LastFmButton />
  </Section>
);

export default LoginSection;
