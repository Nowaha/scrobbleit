import Button from "../basic/Button.js";
import Section from "../basic/Section.js";
import Profile from "./Profile.js";

const AccountSection = () => (
  <Section id="account" icon="fa-user" title="Account" description="Currently authenticated as:">
    <div class="flex items-center rounded-lg bg-ctp-surface0 p-4 shadow-md shadow-ctp-crust transition-colors hover:bg-ctp-crust">
      <Profile
        avatar="https://lastfm-img.freetls.fastly.net/i/u/avatar170s/d5932f1d7dcfcfab4acf04b8efdd0686.png"
        username="Nowaha"
        authenticatedAt={Date.now()}
      />
      <Button class="ml-auto" variant="secondary">
        Sign out
      </Button>
    </div>
  </Section>
);

export default AccountSection;
