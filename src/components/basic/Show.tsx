import { createEffect } from "../../util/state.js";

type ShowChild = HTMLElement | (() => HTMLElement);

type ShowProps = {
  when: () => any;
  children: ShowChild | ShowChild[];
  fallback?: HTMLElement | (() => HTMLElement);
};

const Show = (props: ShowProps): HTMLElement => {
  const wrapper = document.createElement("g-show");
  wrapper.style.display = "contents";
  let currentElements: HTMLElement[] = [];

  const resolveChildren = (children: ShowChild | ShowChild[]): HTMLElement[] => {
    const arr = Array.isArray(children) ? children : [children];
    return arr.map((child) => (typeof child === "function" ? child() : child));
  };

  createEffect(() => {
    const condition = props.when();
    const nextElements = condition
      ? props.children
        ? resolveChildren(props.children)
        : []
      : props.fallback
        ? resolveChildren(props.fallback)
        : [];

    for (const el of currentElements) el.remove();
    wrapper.append(...nextElements);
    currentElements = nextElements;
  });

  return wrapper;
};

export default Show;
