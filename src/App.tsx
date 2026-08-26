import ManualSection from "./components/manual/ManualSection.js";
import SearchSection from "./components/SearchSection.js";
import h from "./util/h.js";

const App = () => (
  <div>
    <header class="bg-ctp-crust border-b border-ctp-surface0 h-14 flex items-center px-4">
      <h1>s.crobble.it</h1>
    </header>
    <main>
      <SearchSection />
      <ManualSection />
    </main>
    <footer>
      <span>created by Lyulf</span>
    </footer>
  </div>
);

export default App;
