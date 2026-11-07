export const timeAgo = (date: number) => {
  const now = new Date().getTime() / 1000;
  const passed = now - date;

  if (passed < 60) return `${passed}s ago`;
  if (passed < 3600) {
    const minutes = Math.floor(passed / 60);
    return `${minutes}m ago`;
  }
  if (passed < 86400) {
    const hours = Math.floor(passed / 3600);
    return `${hours}h ago`;
  }
  const days = Math.floor(passed / 86400);
  return `${days}d ago`;
};
