import { createSignal, type Accessor, type Setter } from "solid-js";

export const createPersistedSignal = (
  key: string,
  initial: string | null = null
): [Accessor<string | null>, Setter<string | null>] => {
  const stored = localStorage.getItem(key);
  const [value, setValue] = createSignal<string | null>(stored ?? initial);

  const set = ((arg: any) => {
    const next = setValue(arg); // Solid resolves functional updates for you
    if (next === null || next === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, next);
    }
    return next;
  }) as Setter<string | null>;

  return [value, set];
};