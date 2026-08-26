type ScrobbleButtonProps = {
  onClick?: () => void;
};

const ScrobbleButton = (props: ScrobbleButtonProps = {}) => (
  <button id="scrobble" type="submit" onclick={props.onClick}>
    Scrobble
  </button>
);

export default ScrobbleButton;
