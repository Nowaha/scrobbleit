import { lastFmKey } from "../../state/auth.js";
import AccountSection from "../account/AccountSection.js";
import Show from "../basic/Show.js";
import InfoSection from "../info/InfoSection.js";
import LoginSection from "../login/LoginSection.js";
import ManualSection from "../manual/ManualSection.js";
import RecentSection from "../recent/RecentSection.js";
import SearchSection from "../search/SearchSection.js";

const Main = () => (
  <main class="flex w-full max-w-2xl grow flex-col gap-8 px-8 py-8">
    <InfoSection />
    <Show when={lastFmKey} fallback={<LoginSection />}>
      <AccountSection />
      <SearchSection />
      <ManualSection />
      <RecentSection />
    </Show>
  </main>
);

export default Main;
