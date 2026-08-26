import { h } from "./h.js";

export function jsx(type: any, props: any, key?: any) {
  const { children, ...restProps } = props || {};

  if (typeof type === "function") {
    return type({ ...restProps, children });
  }

  if (children !== undefined) {
    const childrenArray = Array.isArray(children) ? children : [children];
    return h(type, restProps, ...childrenArray);
  }

  return h(type, restProps);
}

export const jsxs = jsx;
export const jsxDEV = jsx;

declare global {
  namespace JSX {
    type Element = HTMLElement;
    interface IntrinsicElements {
      [elemName: string]: Record<string, any>;
    }
  }
}
