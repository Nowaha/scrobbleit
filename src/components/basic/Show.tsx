import { createEffect } from "../../util/state.js";

type ShowProps = {
  when: () => any;
  children: HTMLElement | (() => HTMLElement);
  fallback?: HTMLElement | (() => HTMLElement);
};

export const Show = (props: ShowProps): HTMLElement => {
  const marker = document.createComment("show-marker");
  let currentElement: HTMLElement | null = null;

  const getChild = (child: HTMLElement | (() => HTMLElement)) =>
    typeof child === "function" ? (child as () => HTMLElement)() : child;

  createEffect(() => {
    const condition = props.when();

    let nextElement: HTMLElement | null = null;
    if (condition) {
      nextElement = props.children ? getChild(props.children) : null;
    } else if (props.fallback) {
      nextElement = getChild(props.fallback);
    }

    if (currentElement && currentElement.parentNode) {
      if (nextElement) {
        currentElement.replaceWith(nextElement);
      } else {
        currentElement.remove();
      }
    } else if (nextElement && marker.parentNode) {
      marker.parentNode.insertBefore(nextElement, marker);
    }

    currentElement = nextElement;
  });

  const wrapper = document.createElement("g-show");
  wrapper.style.display = "contents";
  wrapper.appendChild(marker);
  return wrapper;
};

export default Show;
