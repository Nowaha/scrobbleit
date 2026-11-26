import type { JSX } from "solid-js";
import { signOut } from "../../state/auth.ts";
import Button from "../basic/Button.tsx";
import Section from "../basic/Section.tsx";
import Profile from "./Profile.tsx";

const AccountSection = (): JSX.Element => (
  <Section id="account" icon="fa-user" title="Account" description="Currently authenticated as:">
    <div class="flex items-center rounded-lg bg-ctp-surface0 p-4 shadow-md shadow-ctp-crust transition-colors hover:bg-ctp-crust">
      <Profile />
      <Button class="ml-auto" variant="secondary" onClick={signOut}>
        Sign out
      </Button>
    </div>
  </Section>
);

export default AccountSection;
