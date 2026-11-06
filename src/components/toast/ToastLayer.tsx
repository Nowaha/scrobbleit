import { registerToastHandler } from "../../service/toastService";
import Toast, { ToastInfo } from "./Toast";

const ToastLayer = (): HTMLElement => {
  let toastsContainer!: HTMLUListElement;

  const addToast = (toastInfo: ToastInfo) => {
    console.log("add");
    console.log(toastsContainer);
    let el!: HTMLElement;
    let leaving = false;

    const dismiss = () => {
      if (leaving) return;
      leaving = true;

      el.firstElementChild?.classList.remove("animate-slide-in");
      el.firstElementChild?.classList.add("animate-slide-out");
      el.addEventListener("animationend", () => el.remove(), { once: true });
    };

    el = toastsContainer.appendChild(
      <li>
        <Toast
          variant={toastInfo.variant}
          text={toastInfo.text}
          timeout={toastInfo.timeout}
          dismissable={toastInfo.dismissable}
          dismiss={dismiss}
        />
      </li>,
    );
  };

  return (
    <ul
      id="toast-region"
      role="region"
      aria-label="notifications"
      class="absolute top-0 right-0 left-0 z-4 flex flex-col overflow-hidden"
      ref={(el: HTMLUListElement) => {
        toastsContainer = el;
        registerToastHandler(addToast);
      }}
    ></ul>
  );
};

export default ToastLayer;
