export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || value.trim().toUpperCase().startsWith("TODO");
}
