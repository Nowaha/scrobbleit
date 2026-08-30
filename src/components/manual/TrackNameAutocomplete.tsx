import { fetchImageUrl } from "../../api/iTunes.js";
import { getLastFmApi } from "../../api/lastfm/lastfm.js";
import { Signal } from "../../util/state.js";
import AutocompleteInput from "../basic/input/autocomplete/Autocomplete.js";
import Recommendation from "../basic/input/autocomplete/Recommendation.js";

export type SearchResult = {
  name: string;
  artist: string;
  listeners: number;
};

type TrackNameAutocompleteProps = {
  id: string;
  value: Signal<string>;
  onResultSelected?: (result: SearchResult) => void;
  onItemsChanged?: (
    items: {
      data: SearchResult;
      element: HTMLElement;
    }[],
  ) => void;
};

const TrackNameAutocomplete = (props: TrackNameAutocompleteProps) => {
  const lastFmApi = getLastFmApi();

  const search = async (query: string) => {
    const response = await lastFmApi.track.search({ track: query });
    if (response.error) {
      console.error(`Error: ${response.error.error} - ${response.error.message}`);
      return [];
    }
    const tracks = response.data.results.trackmatches.track.slice(0, 5);
    const asResults: SearchResult[] = tracks.map((t: any) => ({
      name: t.name,
      artist: t.artist,
      listeners: Number(t.listeners),
    }));
    return asResults;
  };

  const buildElement = (result: SearchResult) => (
    <Recommendation
      artist={result.artist}
      track={result.name}
      listeners={result.listeners}
      imageUrlFetcher={() => fetchImageUrl(result.artist, result.name)}
    />
  );

  return (
    <AutocompleteInput
      id={props.id}
      label="Track name"
      placeholder="Track name"
      value={props.value}
      required
      search={search}
      buildElement={buildElement}
      onResultSelected={props.onResultSelected}
    />
  );
};

export default TrackNameAutocomplete;
