import { isPlaceholder } from "./placeholder";

export function containsTodo(value: string): boolean {
  return /\bTODO\b/.test(value);
}

export function firstText(...values: Array<string | undefined | null>): string | undefined {
  for (const value of values) {
    if (value && !isPlaceholder(value) && !containsTodo(value)) return value.trim();
  }
  return undefined;
}
