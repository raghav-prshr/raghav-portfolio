import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { BootScreen } from "./components/BootScreen";
import { Footer } from "./components/Footer";
import { HudNav } from "./components/HudNav";
import { Landing } from "./components/Landing";
import { LockedSection } from "./components/LockedSection";
import { site } from "./data/profile";
import { sections } from "./data/sections";
import { useActiveSection } from "./hooks/useActiveSection";
import { sectionComponents } from "./sections/registry";

// Stable reference: the hook re-subscribes only if this changes.
const NAV_IDS: readonly string[] = ["home", ...sections.map((s) => s.id)];

export default function App() {
  const [booted, setBooted] = useState(false);
  const handleBootDone = useCallback(() => setBooted(true), []);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    document.title = site.title;
  }, []);

  // Lock page scroll while the boot screen is up.
  useEffect(() => {
    document.documentElement.classList.toggle("is-booting", !booted);
  }, [booted]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!booted && <BootScreen key="boot" title={site.handle} lines={site.bootLines} onDone={handleBootDone} />}
      </AnimatePresence>

      <HudNav active={active} />

      <main>
        <Landing ready={booted} />
        {sections.map((def) => {
          const Section = sectionComponents[def.id] ?? LockedSection;
          return <Section key={def.id} def={def} />;
        })}
      </main>

      <Footer />
    </MotionConfig>
  );
}
