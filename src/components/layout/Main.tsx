import ManualSection from "../manual/ManualSection.js";
import SearchSection from "../SearchSection.js";

const Main = () => (
  <main class="flex max-w-2xl min-w-2xl grow flex-col gap-8 py-8">
    <SearchSection />
    <ManualSection />
  </main>
);

export default Main;
