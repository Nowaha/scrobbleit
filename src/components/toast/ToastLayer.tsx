import { For } from "solid-js";
import { dismissToast, removeToast, toastList } from "../../service/toastService.js";
import Toast from "./Toast.js";

const ToastLayer = () => (
  <ul
    id="toast-region"
    role="region"
    aria-label="notifications"
    class="fixed top-0 right-0 left-0 z-4 flex flex-col overflow-hidden"
  >
    <For each={toastList}>
      {(toast) => (
        <li>
          <Toast
            variant={toast.variant}
            text={toast.text}
            timeout={toast.timeout}
            dismissable={toast.dismissable}
            leaving={toast.leaving}
            dismiss={() => dismissToast(toast.id)}
            onRemoved={() => removeToast(toast.id)}
          />
        </li>
      )}
    </For>
  </ul>
);

export default ToastLayer;
