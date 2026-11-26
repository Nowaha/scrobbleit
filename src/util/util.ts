export const numberFormat = new Intl.NumberFormat("nl-NL");

export const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

export const debounce = <Args extends unknown[], Return>(
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
