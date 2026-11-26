import { Show, type JSX } from "solid-js";
import { lastFmKey } from "../../state/auth.ts";
import AccountSection from "../account/AccountSection.tsx";
import InfoSection from "../info/InfoSection.tsx";
import LoginSection from "../login/LoginSection.tsx";
import ScrobbleSection from "../scrobble/ScrobbleSection.tsx";
import RecentSection from "../recent/RecentSection.tsx";

const Main = (): JSX.Element => (
  <main class="flex w-full max-w-2xl grow flex-col gap-8 px-8 py-8">
    <InfoSection />
    <Show when={lastFmKey()} fallback={<LoginSection />}>
      <AccountSection />
      <ScrobbleSection />
      <RecentSection />
    </Show>
  </main>
);

export default Main;
