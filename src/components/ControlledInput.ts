import h from "../util/h.js";
import { Signal } from "../util/state.js";

type ControlledInputProps = {
  id: string;
  label: string;
  type?: string;
  value: Signal<string>;
  error: Signal<string | undefined>;
  required?: boolean;
};

const ControlledInput = (props: ControlledInputProps): HTMLElement => {
  const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    props.value.set(val);
    if (props.error()) props.error.set(undefined);
  };

  return h(
    "div",
    { class: "field" },
    h(
      "label",
      { htmlFor: props.id, class: props.required ? "required" : "" },
      props.label,
    ),
    h("input", {
      id: props.id,
      type: props.type ?? "text",
      value: props.value,
      class: () => (props.error() ? "error" : ""),
      on: { input: handleInput },
    }),
    h(
      "span",
      {
        id: `${props.id}-error`,
        class: () => `error-message ${props.error() ? "" : "hidden"}`,
      },
      () => props.error() ?? "",
    ),
  );
};

export default ControlledInput;
