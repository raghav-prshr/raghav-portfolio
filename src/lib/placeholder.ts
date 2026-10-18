/**
 * Any config string that is empty or starts with "TODO" is treated as
 * "not filled in yet" and rendered in a muted placeholder style.
 */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || value.trim().toUpperCase().startsWith("TODO");
}
