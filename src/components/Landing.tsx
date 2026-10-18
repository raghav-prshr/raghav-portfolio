import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { site } from "../data/profile";
import { sections } from "../data/sections";
import { scrollToSection } from "../lib/scroll";
import { GlitchText } from "./GlitchText";

interface LandingProps {
  /** Becomes true when the boot screen is gone; starts the entrance animation. */
  ready: boolean;
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.55 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

/** Cinematic title screen with a GTA-style vertical main menu. */
export function Landing({ ready }: LandingProps) {
  const [selected, setSelected] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [base, ...rest] = site.handle.split(".");
  const ext = rest.join(".");

  const move = (delta: number) => {
    const next = (selected + delta + sections.length) % sections.length;
    itemRefs.current[next]?.focus(); // onFocus updates `selected`
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    }
  };

  const state = ready ? "show" : "hidden";

  return (
    <section id="home" className="landing" aria-label="Title screen">
      <div className="landing__grid" aria-hidden="true" />
      <div className="landing__glow" aria-hidden="true" />

      <motion.div
        className="letterbox letterbox--top"
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: ready ? 0.16 : 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="letterbox letterbox--bottom"
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: ready ? 0.16 : 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="landing__inner">
        <motion.div
          className="landing__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        >
          <p className="landing__eyebrow">{site.eyebrow}</p>
          <h1 className="landing__title">
            <GlitchText text={site.handle}>
              <span className="landing__base">{base}</span>
              {ext && <span className="landing__ext">.{ext}</span>}
            </GlitchText>
          </h1>
          <p className="landing__tagline">{site.tagline}</p>
        </motion.div>

        <nav className="menu" aria-label="Main menu" onKeyDown={onKeyDown}>
          <motion.ul className="menu__list" variants={listVariants} initial="hidden" animate={state}>
            {sections.map((s, i) => (
              <motion.li key={s.id} variants={itemVariants}>
                <button
                  type="button"
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className={`menu__item${selected === i ? " is-selected" : ""}`}
                  onMouseEnter={() => setSelected(i)}
                  onFocus={() => setSelected(i)}
                  onClick={() => scrollToSection(s.id)}
                >
                  <span className="menu__num">{s.number}</span>
                  <span className="menu__label">{s.menuLabel}</span>
                  <span className="menu__arrow" aria-hidden="true">▶</span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
          <p className="menu__hint" aria-live="polite">
            {sections[selected]?.hint}
          </p>
          <p className="menu__keys" aria-hidden="true">
            ↑ ↓ NAVIGATE &nbsp;·&nbsp; ENTER SELECT
          </p>
        </nav>
      </div>

      <p className="landing__scroll" aria-hidden="true">SCROLL ▾</p>
    </section>
  );
}
