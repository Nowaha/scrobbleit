import Show from "../basic/Show";

const timeouts = {
  short: 2000,
  medium: 5000,
  long: 10000,
} as const;
export type ToastTimeout = keyof typeof timeouts;
export type ToastVariant = "positive" | "negative" | "warning" | "info";
export type ToastInfo = {
  variant: ToastVariant;
  text: string;
  dismissable: boolean;
  timeout: ToastTimeout;
};

type ToastProps = {
  variant: ToastVariant;
  text: string;
  dismissable?: boolean;
  timeout?: ToastTimeout;
  dismiss: () => void;
};

const Toast = (props: ToastProps): HTMLElement => {
  setTimeout(
    () => {
      props.dismiss();
    },
    timeouts[props.timeout ?? "medium"],
  );

  return (
    <div
      role={props.variant === "positive" || "info" ? "status" : "alert"}
      class="relative flex w-full animate-slide-in justify-between p-4 text-ctp-base"
      classList={{
        "bg-ctp-green-500": props.variant === "positive",
        "bg-ctp-red-500": props.variant === "negative",
        "bg-ctp-yellow-500": props.variant === "warning",
        "bg-ctp-mauve-500": props.variant === "info",
      }}
    >
      <span>{props.text}</span>
      <Show when={props.dismissable}>
        <button
          class="absolute top-3 right-3 bottom-3 aspect-square rounded-md border border-transparent text-xl text-ctp-base hover:border-ctp-base"
          aria-label="Dismiss"
          onclick={() => props.dismiss()}
        >
          x
        </button>
      </Show>
    </div>
  );
};

export default Toast;
