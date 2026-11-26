import { beforeEach, describe, expect, it } from "vitest";
import { dismissToast, removeToast, toastList, toasts, toastTimeouts } from "../toastService.ts";

describe("toastService", () => {
  beforeEach(() => {
    for (const toast of [...toastList]) {
      removeToast(toast.id);
    }
  });

  it("adds a toast with default options", () => {
    toasts.success("Saved!");

    expect(toastList).toEqual([
      {
        id: expect.any(Number),
        variant: "positive",
        text: "Saved!",
        dismissable: true,
        timeout: "medium",
        leaving: false,
      },
    ]);
  });

  it.each([
    ["success", "positive"],
    ["error", "negative"],
    ["warning", "warning"],
    ["info", "info"],
  ] as const)("maps toasts.%s to the %s variant", (method, variant) => {
    toasts[method]("text");

    expect(toastList[0].variant).toBe(variant);
  });

  it("applies the given options", () => {
    toasts.info("Copied", { timeout: "short", dismissable: false });

    expect(toastList[0]).toMatchObject({ timeout: "short", dismissable: false });
  });

  it("appends toasts in order with unique ids", () => {
    toasts.info("first");
    toasts.error("second");
    toasts.success("third");

    expect(toastList.map((t) => t.text)).toEqual(["first", "second", "third"]);
    expect(new Set(toastList.map((t) => t.id)).size).toBe(3);
  });

  it("marks only the dismissed toast as leaving", () => {
    toasts.info("stays");
    toasts.info("leaves");
    const [stays, leaves] = toastList;

    dismissToast(leaves.id);

    expect(toastList.find((t) => t.id === leaves.id)?.leaving).toBe(true);
    expect(toastList.find((t) => t.id === stays.id)?.leaving).toBe(false);
  });

  it("removes only the given toast", () => {
    toasts.info("stays");
    toasts.info("removed");
    const removedId = toastList[1].id;

    removeToast(removedId);

    expect(toastList.map((t) => t.text)).toEqual(["stays"]);
  });

  it("ignores unknown ids", () => {
    toasts.info("toast");

    dismissToast(999);
    removeToast(999);

    expect(toastList).toHaveLength(1);
    expect(toastList[0].leaving).toBe(false);
  });

  it("orders the timeouts from short to long", () => {
    expect(toastTimeouts.short).toBeLessThan(toastTimeouts.medium);
    expect(toastTimeouts.medium).toBeLessThan(toastTimeouts.long);
  });
});
