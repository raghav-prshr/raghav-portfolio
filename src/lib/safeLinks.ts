import { isPlaceholder } from "./placeholder";

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

/** Returns a normalised http(s) URL, or null for anything else (TODO, empty, javascript:, ...). */
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

/** Accepts a site-relative asset path such as "/resume.pdf" (file placed in /public). */
export function localAssetPath(value: string | undefined | null): string | null {
  if (!value || isPlaceholder(value)) return null;
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("..") || /\s/.test(path)) return null;
  return path;
}

/** Returns a plausible email address, or null. */
export function emailAddress(value: string | undefined | null): string | null {
  if (!value || isPlaceholder(value)) return null;
  const email = value.trim();
  return EMAIL_RE.test(email) ? email : null;
}

/** "https://www.github.com/user/" → "github.com/user" */
export function displayUrl(href: string): string {
  try {
    const url = new URL(href);
    return (url.host.replace(/^www\./, "") + url.pathname).replace(/\/$/, "");
  } catch {
    return href;
  }
}
