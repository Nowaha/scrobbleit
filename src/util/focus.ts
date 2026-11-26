export const focusNextInputOnEnter = (e: KeyboardEvent & { currentTarget: HTMLElement }): void => {
  if (e.key !== "Enter" || e.defaultPrevented || !(e.target instanceof HTMLInputElement)) {
    return;
  }
  const inputs = Array.from(e.currentTarget.getElementsByTagName("input"));
  const index = inputs.indexOf(e.target);
  if (index === -1) {
    return;
  }
  e.preventDefault();
  inputs[(index + 1) % inputs.length].focus();
};
