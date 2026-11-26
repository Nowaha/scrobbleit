import type { VoidComponent } from "solid-js";
import Button from "../basic/Button.tsx";

type ScrobbleButtonProps = {
  loading?: boolean;
};

const ScrobbleButton: VoidComponent<ScrobbleButtonProps> = (props) => (
  <Button variant="primary" id="scrobble" type="submit" disabled={props.loading} loading={props.loading}>
    Scrobble
  </Button>
);

export default ScrobbleButton;
