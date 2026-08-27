import InfoSection from "../info/InfoSection.js";
import LoginSection from "../login/LoginSection.js";
import ManualSection from "../manual/ManualSection.js";
import SearchSection from "../search/SearchSection.js";

const Main = () => (
  <main class="flex w-full max-w-2xl grow flex-col gap-8 px-8 py-8">
    <InfoSection />
    <LoginSection />
    <SearchSection />
    <ManualSection />
  </main>
);

export default Main;
