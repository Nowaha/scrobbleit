import { createStore } from "solid-js/store";

export const toastTimeouts = {
  short: 2000,
  medium: 5000,
  long: 10000,
} as const;

export type ToastTimeout = keyof typeof toastTimeouts;
export type ToastVariant = "positive" | "negative" | "warning" | "info";
export type ToastInfo = {
  variant: ToastVariant;
  text: string;
  dismissable: boolean;
  timeout: ToastTimeout;
};
export type ToastEntry = ToastInfo & { id: number; leaving: boolean };
export type ToastOptions = Partial<Pick<ToastInfo, "dismissable" | "timeout">>;

const [toastList, setToastList] = createStore<ToastEntry[]>([]);
export { toastList };

let nextId = 0;

const push = (variant: ToastVariant, text: string, options: ToastOptions = {}) =>
  setToastList(toastList.length, {
    id: nextId++,
    variant,
    text,
    dismissable: options.dismissable ?? true,
    timeout: options.timeout ?? "medium",
    leaving: false,
  });

export const dismissToast = (id: number) => setToastList((t) => t.id === id, "leaving", true);

export const removeToast = (id: number) => setToastList((list) => list.filter((t) => t.id !== id));

export const toasts = {
  success: (text: string, options?: ToastOptions) => push("positive", text, options),
  error: (text: string, options?: ToastOptions) => push("negative", text, options),
  warning: (text: string, options?: ToastOptions) => push("warning", text, options),
  info: (text: string, options?: ToastOptions) => push("info", text, options),
};

export const useToasts = () => toasts;
