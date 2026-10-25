import { contact } from "../data/profile";
import { resume } from "../data/resume";
import type { SocialLink } from "../types";
import { isPlaceholder } from "./placeholder";
import { displayUrl, emailAddress, externalUrl, localAssetPath } from "./safeLinks";
import { firstText } from "./text";

export type ChannelKind = "external" | "mailto" | "file";

export interface ContactChannel {
  id: string;
  label: string;
  glyph: string;
  href: string;
  display: string;
  kind: ChannelKind;
}

const GLYPHS: Record<string, string> = { github: "GH", linkedin: "in", email: "@", resume: "CV" };
const ORDER = ["github", "linkedin", "email", "resume"];

function glyphFor(id: string, label: string): string {
  return GLYPHS[id] ?? label.slice(0, 2);
}

function socialChannel(social: SocialLink): ContactChannel | null {
  const href = externalUrl(social.href);
  if (!href) return null;
  return {
    id: social.id,
    label: social.label,
    glyph: glyphFor(social.id, social.label),
    href,
    display: firstText(social.handle) ?? displayUrl(href),
    kind: "external",
  };
}

export function getContactChannels(): ContactChannel[] {
  const channels: ContactChannel[] = contact.socials
    .map(socialChannel)
    .filter((c): c is ContactChannel => c !== null);

  const email = emailAddress(contact.email);
  if (email) {
    channels.push({ id: "email", label: "Email", glyph: glyphFor("email", "Email"), href: `mailto:${email}`, display: email, kind: "mailto" });
  }

  const remote = externalUrl(resume.href);
  const local = remote ? null : localAssetPath(resume.href);
  const resumeHref = remote ?? local;
  if (resumeHref) {
    channels.push({
      id: "resume",
      label: isPlaceholder(resume.label) ? "Resume" : resume.label,
      glyph: glyphFor("resume", "Resume"),
      href: resumeHref,
      display: remote ? displayUrl(remote) : "Open resume",
      kind: remote ? "external" : "file",
    });
  }

  const rank = (id: string) => {
    const i = ORDER.indexOf(id);
    return i === -1 ? ORDER.length : i;
  };
  return channels.sort((a, b) => rank(a.id) - rank(b.id));
}
