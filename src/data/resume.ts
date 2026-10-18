/*
 * Resume action for the Contact section and the terminal `contact` command.
 *
 * Leave `href` as "" to hide the resume button. Otherwise use either:
 *   • a file in /public, e.g. "/resume.pdf"  (put resume.pdf in the `public/` folder)
 *   • a full https:// link
 */
export interface ResumeConfig {
  label: string;
  href: string;
}

export const resume: ResumeConfig = {
  label: "Resume",
  href: "",
};
