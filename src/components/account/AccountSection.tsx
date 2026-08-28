import { authTimeStamp, lastFmImage, lastFmKey, lastFmName } from "../../state/auth.js";
import Button from "../basic/Button.js";
import Section from "../basic/Section.js";
import Profile from "./Profile.js";

const AccountSection = () => {
  return (
    <Section id="account" icon="fa-user" title="Account" description="Currently authenticated as:">
      <div class="flex items-center rounded-lg bg-ctp-surface0 p-4 shadow-md shadow-ctp-crust transition-colors hover:bg-ctp-crust">
        <Profile />
        <Button
          class="ml-auto"
          variant="secondary"
          on={{
            click: () => {
              authTimeStamp.set(null);
              lastFmImage.set(null);
              lastFmKey.set(null);
              lastFmName.set(null);
            },
          }}
        >
          Sign out
        </Button>
      </div>
    </Section>
  );
};

export default AccountSection;
