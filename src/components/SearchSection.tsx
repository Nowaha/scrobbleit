import Spacer from "./basic/Spacer.js";
import SearchInput, { SearchResult } from "./search/SearchInput.js";

type SearchSectionProps = {
  onResultSelected?: (result: SearchResult) => void;
};

const SearchSection = (props?: SearchSectionProps) => {
  const queueElement = <div id="queue" />;

  return (
    <section id="searchSection">
      <h3 class="text-2xl font-bold">Search</h3>
      <p class="text-ctp-subtext0">Start searching for a track to easily scrobble.</p>
      <Spacer />
      <SearchInput id="searchInput" onResultSelected={props?.onResultSelected} />
      {queueElement}
    </section>
  );
};

export default SearchSection;
