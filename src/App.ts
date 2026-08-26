import ManualSection from "./components/manual/ManualSection.js";
import SearchSection from "./components/SearchSection.js";
import h from "./util/h.js";

const App = () =>
  h(
    "div",
    {},
    h("header", {}, h("h1", {}, "s.crobble.it")),
    h("main", {}, SearchSection(), ManualSection()),
    h("footer", {}, h("span", {}, "by Lyulf")),
  );

export default App;
