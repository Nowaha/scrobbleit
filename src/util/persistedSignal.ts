import { createSignal } from "./state.js";

export const createPersistedSignal = (key: string, initial: string | null = null) => {
  const stored = localStorage.getItem(key);
  const sig = createSignal<string | null>(stored ?? initial);
  const originalSet = sig.set;
  sig.set = (value) => {
    const next = typeof value === "function" ? (value as Function)(sig()) : value;
    if (next === null || next === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, next);
    }
    originalSet(next);
  };
  return sig;
};
