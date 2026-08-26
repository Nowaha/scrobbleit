import { createEffect, Signal } from "./state.js";

type Bindable<T> = T | Signal<T> | (() => T);
type Child =
  Node | string | number | Signal<any> | (() => any) | null | undefined;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: Record<string, any> | null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);

  if (props) {
    for (const [key, val] of Object.entries(props)) {
      if (key === "on" && typeof val === "object") {
        for (const [event, handler] of Object.entries(val)) {
          el.addEventListener(event, handler as EventListener);
        }
      } else if (typeof val === "function" && !key.startsWith("on")) {
        // Reactive property binding
        createEffect(() => {
          const res = val();
          if (key === "class") el.className = res || "";
          else if (key.startsWith("aria-")) el.setAttribute(key, String(res));
          else (el as any)[key] = res;
        });
      } else {
        if (key === "class") el.className = val;
        else (el as any)[key] = val;
      }
    }
  }

  for (const child of children.flat()) {
    if (child == null) continue;

    if (typeof child === "function") {
      // Dynamic Text Node Binding
      const textNode = document.createTextNode("");
      createEffect(() => {
        textNode.data = String(child() ?? "");
      });
      el.appendChild(textNode);
    } else {
      el.append(
        typeof child === "number"
          ? document.createTextNode(String(child))
          : child,
      );
    }
  }

  return el;
}

export default h;
