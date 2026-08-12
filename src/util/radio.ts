export const radioGroup = <T>(
  combobox: HTMLInputElement,
  items: { data: T; element: HTMLElement }[],
  onSelect: (item: T) => void,
) => {
  let index = 0;

  const select = (i: number) => {
    items[index]?.element.setAttribute("aria-selected", "false");
    index = i;
    items[index]?.element.setAttribute("aria-selected", "true");
    combobox.setAttribute("aria-activedescendant", items[i].element.id);
  };

  select(0);

  items.forEach(({ element, data }, i) => {
    element.addEventListener("mousedown", (e) => e.preventDefault());
    element.addEventListener("click", () => {
      select(i);
      onSelect(data);
    });
  });

  return {
    next: () => select(Math.min(index + 1, items.length - 1)),
    prev: () => select(Math.max(index - 1, 0)),
    select: () => onSelect(items[index].data),
  };
};
