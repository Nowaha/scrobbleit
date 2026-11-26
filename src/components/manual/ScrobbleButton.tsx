import { VoidComponent } from "solid-js";
import Button from "../basic/Button.tsx";

type ScrobbleButtonProps = {
  loading?: boolean;
  onClick?: () => void;
};

const ScrobbleButton: VoidComponent<ScrobbleButtonProps> = (props: ScrobbleButtonProps) => (
  <Button
    variant="primary"
    id="scrobble"
    type="submit"
    onclick={props.onClick}
    disabled={props.loading}
    loading={props.loading}
  >
    Scrobble
  </Button>
);

export default ScrobbleButton;
