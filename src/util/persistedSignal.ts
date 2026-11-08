import { createSignal, type Accessor, type Setter } from "solid-js";

type Value = string | null;

export const createPersistedSignal = (key: string, initial: Value = null): [Accessor<Value>, Setter<Value>] => {
  const stored = localStorage.getItem(key);
  const [value, setValue] = createSignal<Value>(stored ?? initial);

  const set = ((arg: Value | ((prev: Value) => Value)) => {
    const next = setValue(arg);
    if (next === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, next);
    }
    return next;
  }) as Setter<Value>;

  return [value, set];
};
