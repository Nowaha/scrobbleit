import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { timeAgo } from "../time.ts";

const NOW_SECONDS = 1_700_000_000;

describe("timeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW_SECONDS * 1000);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    [12.5, "12s ago"],
    [59, "59s ago"],
    [60, "1m ago"],
    [3599, "59m ago"],
    [3600, "1h ago"],
    [86_399, "23h ago"],
    [86_400, "1d ago"],
    [3 * 86_400, "3d ago"],
  ])("formats %ss as %s", (secondsAgo, expected) => {
    expect(timeAgo(NOW_SECONDS - secondsAgo)).toBe(expected);
  });
});
