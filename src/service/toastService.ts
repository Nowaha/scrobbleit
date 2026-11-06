import { ToastInfo } from "../components/toast/Toast";

type ToastHandler = (toast: ToastInfo) => void;

let handler: ToastHandler | null = null;
const pending: ToastInfo[] = [];

export const registerToastHandler = (fn: ToastHandler) => {
  handler = fn;
  pending.splice(0).forEach(fn);
};

export const unregisterToastHandler = (fn: ToastHandler) => {
  if (handler === fn) handler = null;
};

const show = (toast: ToastInfo) => {
  if (handler) handler(toast);
  else pending.push(toast);
};

export const useToasts = () => ({
  show,
  info: (text: string, opts: Partial<ToastInfo> = {}) =>
    show({ variant: "info", text, dismissable: true, timeout: "medium", ...opts } as ToastInfo),
  success: (text: string, opts: Partial<ToastInfo> = {}) =>
    show({ variant: "positive", text, dismissable: true, timeout: "medium", ...opts } as ToastInfo),
  error: (text: string, opts: Partial<ToastInfo> = {}) =>
    show({ variant: "negative", text, dismissable: true, timeout: "medium", ...opts } as ToastInfo),
  warning: (text: string, opts: Partial<ToastInfo> = {}) =>
    show({ variant: "warning", text, dismissable: true, timeout: "medium", ...opts } as ToastInfo),
});
