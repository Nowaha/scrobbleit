export const fetchImageUrl = (artist: string, track: string): Promise<string> =>
  fetch(`https://itunes.apple.com/search?term=${artist}+${track}&entity=song&limit=1`)
    .then((res) => res.json())
    .then((json) => json.results[0].artworkUrl30);
