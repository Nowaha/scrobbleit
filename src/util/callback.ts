export const checkCallback = (): string | undefined => {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");

  if (!token) return undefined;

  url.searchParams.delete("token");
  window.history.replaceState({}, "", url);
  return token;
};
