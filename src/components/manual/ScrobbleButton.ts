import h from "../../util/h.js";

type ScrobbleButtonProps = {
  onClick?: () => void;
};

const ScrobbleButton = (props: ScrobbleButtonProps = {}) =>
  h(
    "button",
    { id: "scrobble", type: "submit", on: { click: props.onClick } },
    "Scrobble",
  );

export default ScrobbleButton;
