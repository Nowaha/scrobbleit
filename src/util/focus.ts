export const focusNext = (el: HTMLElement) => {
  const focusable = Array.from(
    document.querySelectorAll<HTMLElement>(
      'input, button, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  );
  const index = focusable.indexOf(el);
  focusable[index + 1]?.focus();
};

export const createInputFocusGroup = (parent: HTMLElement) => {
  const inputs = Array.from(parent.getElementsByTagName("input"));

  parent.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const i = inputs.indexOf(e.target as HTMLInputElement);
    if (i !== -1) inputs[(i + 1) % inputs.length].focus();
  });
};
