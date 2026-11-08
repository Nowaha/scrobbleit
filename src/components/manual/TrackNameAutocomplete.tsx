import type { VoidComponent } from "solid-js";
import { fetchImageUrl } from "../../api/iTunes.js";
import { getLastFmApi } from "../../api/lastfm/lastfm.js";
import AutocompleteInput from "../basic/input/autocomplete/Autocomplete.js";
import Recommendation from "../basic/input/autocomplete/Recommendation.js";

export type SearchResult = {
  name: string;
  artist: string;
  listeners: number;
};

type TrackNameAutocompleteProps = {
  id: string;
  value: string;
  error?: string;
  onInput: (value: string) => void;
  onResultSelected?: (result: SearchResult) => void;
};

const TrackNameAutocomplete: VoidComponent<TrackNameAutocompleteProps> = (props) => {
  const lastFmApi = getLastFmApi();

  const search = async (query: string): Promise<SearchResult[]> => {
    const response = await lastFmApi.track.search({ track: query });
    if (!response.success) {
      console.error(`Error: ${response.error.error} - ${response.error.message}`);
      return [];
    }
    return response.data.results.trackmatches.track.slice(0, 5).map((t) => ({
      name: t.name,
      artist: t.artist,
      listeners: Number(t.listeners),
    }));
  };

  return (
    <AutocompleteInput
      id={props.id}
      label="Track name"
      placeholder="Track name"
      value={props.value}
      error={props.error}
      onInput={props.onInput}
      required
      search={search}
      renderItem={(result) => (
        <Recommendation
          artist={result.artist}
          track={result.name}
          listeners={result.listeners}
          imageUrlFetcher={() => fetchImageUrl(result.artist, result.name)}
        />
      )}
      onResultSelected={props.onResultSelected}
    />
  );
};

export default TrackNameAutocomplete;
