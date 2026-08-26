import Link from "../basic/Link.js";

const Divider = () => <span>-</span>;

const Footer = () => (
  <footer class="align-center flex w-full items-center justify-center gap-2 border-t border-ctp-surface0 bg-ctp-crust p-4">
    <span>s.crobble.it 2026</span>
    <Divider />
    <span>
      Made with 💜 by{" "}
      <Link href="https://lyulf.xyz/" target="_blank">
        Lyulf
      </Link>
    </span>
    <Divider />
    <span>
      <Link href="https://github.com/Nowaha" target="_blank">
        GitHub
      </Link>
    </span>
  </footer>
);

export default Footer;
