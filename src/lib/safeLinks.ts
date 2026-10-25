import { isPlaceholder } from "./placeholder";

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

export function externalUrl(value: string | undefined | null): string | null {
  if (!value || isPlaceholder(value)) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function localAssetPath(value: string | undefined | null): string | null {
  if (!value || isPlaceholder(value)) return null;
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("..") || /\s/.test(path)) return null;
  return path;
}

export function emailAddress(value: string | undefined | null): string | null {
  if (!value || isPlaceholder(value)) return null;
  const email = value.trim();
  return EMAIL_RE.test(email) ? email : null;
}

export function displayUrl(href: string): string {
  try {
    const url = new URL(href);
    return (url.host.replace(/^www\./, "") + url.pathname).replace(/\/$/, "");
  } catch {
    return href;
  }
}
