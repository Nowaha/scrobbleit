import { createEffect, Signal } from "./state.js";

type Bindable<T> = T | Signal<T> | (() => T);
type Child = Node | string | number | Signal<any> | (() => any) | null | undefined;
type ComponentFunction<P = any> = (props: P, ...children: any[]) => HTMLElement;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K | ComponentFunction,
  props?: Record<string, any> | null,
  ...children: Child[]
): HTMLElement {
  if (typeof tag === "function") {
    return tag(props ?? {}, ...children);
  }

  const el = document.createElement(tag);

  if (props) {
    for (const [key, val] of Object.entries(props)) {
      if (key === "on" && typeof val === "object") {
        for (const [event, handler] of Object.entries(val)) {
          el.addEventListener(event, handler as EventListener);
        }
      } else if (key === "classList" && typeof val === "object") {
        for (const [className, condition] of Object.entries(val)) {
          if (typeof condition === "function") {
            createEffect(() => {
              el.classList.toggle(className, Boolean((condition as () => any)()));
            });
          } else {
            el.classList.toggle(className, Boolean(condition));
          }
        }
      } else if (typeof val === "function" && !key.startsWith("on")) {
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
      el.append(typeof child === "number" ? document.createTextNode(String(child)) : child);
    }
  }

  return el;
}

export default h;
