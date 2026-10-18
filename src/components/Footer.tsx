import { player, site } from "../data/profile";

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {player.name} — {site.handle}
      </p>
      <p className="footer__stack">Built with React · TypeScript · Vite · Framer Motion</p>
    </footer>
  );
}
