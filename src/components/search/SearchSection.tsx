import { createSignal } from "../../util/state.js";
import Section from "../basic/Section.js";
import SearchAutocomplete, { type SearchResult } from "./SearchAutocomplete.js";

type SearchSectionProps = {
  onResultSelected?: (result: SearchResult) => void;
};

const SearchSection = (props?: SearchSectionProps) => {
  const queueElement = <div id="queue" />;

  const searchValue = createSignal<string>("");

  return (
    <Section
      id="searchSection"
      title="Search"
      icon="fa-search"
      description="Start searching for a track to easily scrobble."
    >
      <SearchAutocomplete id="searchInput" value={searchValue} onResultSelected={props?.onResultSelected} />
      {queueElement}
    </Section>
  );
};

export default SearchSection;
