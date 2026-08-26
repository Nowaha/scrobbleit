type Subscriber = () => void;
let activeEffect: Subscriber | null = null;

export type Signal<T> = {
  (): T;
  set: (newValue: T | ((prev: T) => T)) => void;
};

export const createSignal = <T>(initialValue: T): Signal<T> => {
  let value = initialValue;
  const subscribers = new Set<Subscriber>();

  const read = () => {
    if (activeEffect) subscribers.add(activeEffect);
    return value;
  };

  read.set = (newValue: T | ((prev: T) => T)) => {
    const next =
      typeof newValue === "function" ? (newValue as Function)(value) : newValue;
    if (next !== value) {
      value = next;
      subscribers.forEach((fn) => fn());
    }
  };

  return read;
};

export function createEffect(fn: () => void) {
  const execute = () => {
    activeEffect = execute;
    try {
      fn();
    } finally {
      activeEffect = null;
    }
  };
  execute();
}
