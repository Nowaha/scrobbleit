type Listener<T> = (current: T, previous: T) => void;

export type State<T> = {
  get: () => T;
  set: (newValue: T) => void;
  listen: (listener: Listener<T>) => () => void;
};

export const useState = <T>(initialValue: T): State<T> => {
  let value: T = initialValue;
  const listeners = new Set<Listener<T>>();

  const set = (newValue: T) => {
    const previous = value;
    value = newValue;
    listeners.forEach((l) => l(value, previous));
  };

  const listen = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    get: () => value,
    set,
    listen,
  };
};
