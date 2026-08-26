import SearchInput, { SearchResult } from "./search/SearchInput.js";

type SearchSectionProps = {
  onResultSelected?: (result: SearchResult) => void;
};

const SearchSection = (props?: SearchSectionProps) => {
  const queueElement = <div id="queue" />;

  return (
    <section id="searchSection">
      <h3>Search</h3>
      <SearchInput
        id="searchInput"
        onResultSelected={props?.onResultSelected}
      />
      {queueElement}
    </section>
  );
};

export default SearchSection;
