import h from "../util/h.js";
import SearchInput, { SearchResult } from "./search/SearchInput.js";

type SearchSectionProps = {
  onResultSelected?: (result: SearchResult) => void;
};

const SearchSection = (props?: SearchSectionProps) => {
  const queueElement = h("div", { id: "queue" });

  return h(
    "section",
    { id: "searchSection" },
    h("h3", null, "Search"),
    SearchInput({
      id: "searchInput",
      onResultSelected: props?.onResultSelected,
    }),
    queueElement,
  );
};

export default SearchSection;
