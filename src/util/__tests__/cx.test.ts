import { cx } from "../cx.ts";
import { describe, expect, it } from "vitest";

describe("cx", () => {
  it("joins classes with spaces between", () => {
    expect(cx("class1", "class2", "class3")).toEqual("class1 class2 class3");
  });

  it("returns a single class without additional spaces", () => {
    expect(cx("class")).toEqual("class");
  });

  it("excludes 'false' values", () => {
    expect(cx("class1", "class2", false, "class3", false, "class4")).toEqual("class1 class2 class3 class4");
  });

  it("excludes 'null' values", () => {
    expect(cx("class1", "class2", null, "class3", null, "class4")).toEqual("class1 class2 class3 class4");
  });

  it("excludes 'undefined' values", () => {
    expect(cx("class1", "class2", undefined, "class3", undefined, "class4")).toEqual("class1 class2 class3 class4");
  });

  it("excludes all falsy values when mixed", () => {
    expect(cx(null, "class1", "class2", undefined, "class3", undefined, false, "class4")).toEqual(
      "class1 class2 class3 class4",
    );
  });

  it("returns an empty string if no parameters", () => {
    expect(cx()).toEqual("");
  });

  it("returns an empty string when only falsy values", () => {
    expect(cx(null, undefined, undefined, false)).toEqual("");
  });
});
