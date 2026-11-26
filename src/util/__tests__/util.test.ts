import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "../util.ts";

const DELAY_MS = 300;

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls the function once the delay has passed", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    debounced("a");
    vi.advanceTimersByTime(DELAY_MS - 1);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("only calls the function with the latest arguments when called repeatedly", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    debounced("a");
    vi.advanceTimersByTime(DELAY_MS / 2);
    debounced("b");
    vi.advanceTimersByTime(DELAY_MS / 2);
    debounced("c");
    vi.advanceTimersByTime(DELAY_MS);

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("restarts the delay on every call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    debounced();
    vi.advanceTimersByTime(DELAY_MS - 1);
    debounced();
    vi.advanceTimersByTime(DELAY_MS - 1);

    expect(fn).not.toHaveBeenCalled();
  });

  it("does not call the function after cancel", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(DELAY_MS);

    expect(fn).not.toHaveBeenCalled();
  });

  it("can be called again after cancel", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, DELAY_MS);

    debounced("a");
    debounced.cancel();
    debounced("b");
    vi.advanceTimersByTime(DELAY_MS);

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("b");
  });
});
