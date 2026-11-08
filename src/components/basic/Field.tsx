import { children, createEffect, Show, type ParentComponent } from "solid-js";

type FieldProps = {
  label: string;
  class?: string;
  inputId: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

const Field: ParentComponent<FieldProps> = (props) => {
  const resolved = children(() => props.children);
  const errorId = () => `${props.inputId}-error`;

  createEffect(() => {
    const root = resolved.toArray().find((c): c is HTMLElement => c instanceof HTMLElement);
    if (!root) return;

    const target = root.matches("input, select, textarea, button")
      ? root
      : (root.querySelector("input, select, textarea") ?? root);

    if (props.error) {
      target.setAttribute("aria-errormessage", errorId());
      target.setAttribute("aria-invalid", "true");
    } else {
      target.removeAttribute("aria-errormessage");
      target.removeAttribute("aria-invalid");
    }
  });

  return (
    <div class={`flex flex-col ${props.class ?? ""}`}>
      <label for={props.inputId} class="mb-0.5 text-ctp-subtext1">
        {props.label}
        <Show when={props.required}>
          <span class="ml-1 text-ctp-red">*</span>
        </Show>
      </label>
      {resolved()}
      <Show when={props.error}>
        {(error) => (
          <span id={errorId()} role="alert" class="text-ctp-red">
            {error()}
          </span>
        )}
      </Show>
    </div>
  );
};

export default Field;
