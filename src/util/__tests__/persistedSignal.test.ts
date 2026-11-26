// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from "vitest";
import { createPersistedSignal } from "../persistedSignal.ts";

const KEY = "test-key";

type Stored = { name: string; count: number };

describe("createPersistedSignal", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("returns the fallback when nothing is stored", () => {
    const [value] = createPersistedSignal<Stored | null>(KEY, null);

    expect(value()).toBeNull();
  });

  it("reads a previously stored value", () => {
    localStorage.setItem(KEY, JSON.stringify({ name: "stored", count: 3 }));

    const [value] = createPersistedSignal<Stored | null>(KEY, null);

    expect(value()).toEqual({ name: "stored", count: 3 });
  });

  it("returns the fallback when the stored value is not valid JSON", () => {
    localStorage.setItem(KEY, "{not json");

    const [value] = createPersistedSignal(KEY, "fallback");

    expect(value()).toBe("fallback");
  });

  it("updates the value and stores it as JSON", () => {
    const [value, setValue] = createPersistedSignal<Stored | null>(KEY, null);

    setValue({ name: "new", count: 1 });

    expect(value()).toEqual({ name: "new", count: 1 });
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify({ name: "new", count: 1 }));
  });

  it("removes the stored value when set to null", () => {
    localStorage.setItem(KEY, JSON.stringify({ name: "stored", count: 3 }));
    const [value, setValue] = createPersistedSignal<Stored | null>(KEY, null);

    setValue(null);

    expect(value()).toBeNull();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("is picked up by a new signal with the same key", () => {
    const [, setValue] = createPersistedSignal<Stored | null>(KEY, null);
    setValue({ name: "shared", count: 2 });

    const [otherValue] = createPersistedSignal<Stored | null>(KEY, null);

    expect(otherValue()).toEqual({ name: "shared", count: 2 });
  });
});
