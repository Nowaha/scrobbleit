import { createSignal, type Accessor } from "solid-js";

const readStoredValue = <T>(key: string, fallback: T): T => {
  const stored = localStorage.getItem(key);
  if (stored === null) {
    return fallback;
  }
  try {
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
};

export const createPersistedSignal = <T>(key: string, fallback: T): [Accessor<T>, (value: T) => void] => {
  const [value, setValue] = createSignal<T>(readStoredValue(key, fallback));

  const setPersistedValue = (next: T): void => {
    setValue(() => next);
    if (next === null || next === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(next));
    }
  };

  return [value, setPersistedValue];
};
