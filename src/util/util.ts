export const numberFormat = new Intl.NumberFormat("nl-NL");

export const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeStyle: "short",
});

export const debounce = <Args extends any[], Return>(
  fn: (...args: Args) => Return,
  delay: number,
): ((...args: Args) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const trackToId = (track: string, artist: string) =>
  `${artist.replace(/ /g, "").toLowerCase()}-${track.replace(/ /g, "").toLowerCase()}`;
