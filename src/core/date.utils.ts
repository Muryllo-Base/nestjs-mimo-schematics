export function getTimestamp() {
  return (new Date())
    .toISOString()
    .split('.')[0]
    .replace(/[:-]/g, '.');
}
