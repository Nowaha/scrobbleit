import { Show, type ParentComponent } from "solid-js";
import { cx } from "../../util/cx.ts";

type FieldProps = {
  label: string;
  class?: string;
  inputId: string;
  error?: string;
  required?: boolean;
};

// The id of the error message rendered by a Field, for the input's `aria-errormessage`
export const fieldErrorId = (inputId: string): string => `${inputId}-error`;

const Field: ParentComponent<FieldProps> = (props) => (
  <div class={cx("flex flex-col", props.class)}>
    <label for={props.inputId} class="mb-0.5 text-ctp-subtext1">
      {props.label}
      <Show when={props.required}>
        <span class="ml-1 text-ctp-red">*</span>
      </Show>
    </label>
    {props.children}
    <Show when={props.error}>
      {(error) => (
        <span id={fieldErrorId(props.inputId)} role="alert" class="text-ctp-red">
          {error()}
        </span>
      )}
    </Show>
  </div>
);

export default Field;
