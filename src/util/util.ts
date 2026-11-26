export const numberFormat = new Intl.NumberFormat();

export const dateFormat = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export type Debounced<Args extends unknown[]> = ((...args: Args) => void) & { cancel: () => void };

export const debounce = <Args extends unknown[]>(fn: (...args: Args) => void, delay: number): Debounced<Args> => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Args): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
  debounced.cancel = (): void => clearTimeout(timer);

  return debounced;
};
