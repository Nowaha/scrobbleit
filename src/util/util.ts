export const numberFormat = new Intl.NumberFormat("nl-NL");

export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const trackToId = (track: string, artist: string) =>
  `${artist.replace(/ /g, "").toLowerCase()}-${track.replace(/ /g, "").toLowerCase()}`;
