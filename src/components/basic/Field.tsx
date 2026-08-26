import { createEffect, Signal } from "../../util/state.js";
import Show from "./Show.js";

type FieldProps = {
  label: string;
  class?: string;
  inputId: string;
  error: Signal<string | undefined>;
  required?: boolean;
  disabled?: boolean;
  children: (HTMLElement & { id: string }) | (HTMLElement & { id: string })[];
};

const Field = (props: FieldProps) => {
  let errorSpan = undefined;

  const firstChild = props.children instanceof HTMLElement ? props.children : props.children[0];

  createEffect(() => {
    if (props.error()) {
      firstChild.setAttribute("aria-errormessage", `${props.inputId}-error`);
      errorSpan = <span>{props.error}</span>;
    } else {
      firstChild.removeAttribute("aria-errormessage");
      errorSpan = undefined;
    }
  });

  return (
    <div class={`flex flex-col ${props.class ?? ""}`}>
      <label htmlFor={props.inputId} class="text-ctp-subtext1">
        {props.label}
        {props.required ? <span class="ml-1 text-ctp-red">*</span> : undefined}
      </label>
      {props.children}
      <Show when={props.error}>
        <span id={`${props.inputId}-error`} class="text-ctp-red">
          {() => props.error()}
        </span>
      </Show>
    </div>
  );
};

export default Field;
