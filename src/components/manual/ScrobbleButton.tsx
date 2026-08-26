import Button from "../basic/Button.js";

type ScrobbleButtonProps = {
  onClick?: () => void;
};

const ScrobbleButton = (props: ScrobbleButtonProps = {}) => (
  <Button variant="primary" id="scrobble" type="submit" onclick={props.onClick}>
    Scrobble
  </Button>
);

export default ScrobbleButton;
