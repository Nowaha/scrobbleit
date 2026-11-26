// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { focusNextInputOnEnter } from "../focus.ts";

let form: HTMLFormElement;
let inputs: HTMLInputElement[];
let button: HTMLButtonElement;

const pressKey = (target: HTMLElement, key: string): KeyboardEvent => {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
  target.dispatchEvent(event);
  return event;
};

describe("focusNextInputOnEnter", () => {
  beforeEach(() => {
    form = document.createElement("form");
    inputs = [document.createElement("input"), document.createElement("input"), document.createElement("input")];
    button = document.createElement("button");
    form.append(...inputs, button);
    document.body.append(form);

    form.addEventListener("keydown", (e) => focusNextInputOnEnter(e as KeyboardEvent & { currentTarget: HTMLElement }));
  });

  afterEach(() => {
    form.remove();
  });

  it("moves focus to the next input on Enter", () => {
    inputs[0].focus();

    const event = pressKey(inputs[0], "Enter");

    expect(document.activeElement).toBe(inputs[1]);
    expect(event.defaultPrevented).toBe(true);
  });

  it("wraps around from the last input to the first", () => {
    inputs[2].focus();

    pressKey(inputs[2], "Enter");

    expect(document.activeElement).toBe(inputs[0]);
  });

  it("ignores keys other than Enter", () => {
    inputs[0].focus();

    const event = pressKey(inputs[0], "Tab");

    expect(document.activeElement).toBe(inputs[0]);
    expect(event.defaultPrevented).toBe(false);
  });

  it("ignores Enter when a child already handled it", () => {
    inputs[0].addEventListener("keydown", (e) => e.preventDefault());
    inputs[0].focus();

    pressKey(inputs[0], "Enter");

    expect(document.activeElement).toBe(inputs[0]);
  });

  it("ignores Enter on elements that are not inputs", () => {
    button.focus();

    const event = pressKey(button, "Enter");

    expect(document.activeElement).toBe(button);
    expect(event.defaultPrevented).toBe(false);
  });
});
