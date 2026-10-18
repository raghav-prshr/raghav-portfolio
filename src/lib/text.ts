import { isPlaceholder } from "./placeholder";

/** True when a config string still contains an uppercase TODO marker. */
export function containsTodo(value: string): boolean {
  return /\bTODO\b/.test(value);
}

/**
 * Returns the first value that has real content (not empty, not a TODO
 * placeholder), trimmed. Returns undefined when none qualify.
 */
export function firstText(...values: Array<string | undefined | null>): string | undefined {
  for (const value of values) {
    if (value && !isPlaceholder(value) && !containsTodo(value)) return value.trim();
  }
  return undefined;
}
