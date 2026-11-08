import { onCleanup, Show, untrack } from "solid-js";
import { toastTimeouts, type ToastTimeout, type ToastVariant } from "../../service/toastService.ts";

export type { ToastInfo, ToastTimeout, ToastVariant } from "../../service/toastService.ts";

type ToastProps = {
  variant: ToastVariant;
  text: string;
  dismissable?: boolean;
  timeout?: ToastTimeout;
  leaving: boolean;
  dismiss: () => void;
  onRemoved: () => void;
};

const Toast = (props: ToastProps) => {
  const timeout = untrack(() => toastTimeouts[props.timeout ?? "medium"]);
  const timer = setTimeout(() => props.dismiss(), timeout);
  onCleanup(() => clearTimeout(timer));

  return (
    <div
      role={props.variant === "positive" || props.variant === "info" ? "status" : "alert"}
      class="relative flex w-full justify-between p-4 text-ctp-base"
      classList={{
        "animate-slide-in": !props.leaving,
        "animate-slide-out": props.leaving,
        "bg-ctp-green-500": props.variant === "positive",
        "bg-ctp-red-500": props.variant === "negative",
        "bg-ctp-yellow-500": props.variant === "warning",
        "bg-ctp-mauve-500": props.variant === "info",
      }}
      onAnimationEnd={() => {
        if (props.leaving) props.onRemoved();
      }}
    >
      <span>{props.text}</span>
      <Show when={props.dismissable}>
        <button
          class="absolute top-3 right-3 bottom-3 aspect-square rounded-md border border-transparent text-xl text-ctp-base hover:border-ctp-base"
          aria-label="Dismiss"
          onClick={() => props.dismiss()}
        >
          x
        </button>
      </Show>
    </div>
  );
};

export default Toast;
