"use client";

import { motion } from "framer-motion";
import type { MotionStyle } from "framer-motion";
import { useEffect, useState } from "react";
import DotGrid from "@/components/DotGrid/DotGrid";

const NAME = "Dhimant Jaiswal";
const TAGLINE = "CREATIVES | EDITING | FILMING";

const EASE = [0.22, 1, 0.36, 1] as const;

const LETTER_STAGGER = 0.035;
const LETTER_DURATION = 0.22;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: LETTER_STAGGER,
      delayChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: LETTER_DURATION, ease: EASE },
  },
};

const taglineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
};

type IntroProps = {
  style?: MotionStyle;
  showScrollHint?: boolean;
  dotsInteractive?: boolean;
  onRevealReady?: () => void;
};

export default function Intro({
  style,
  showScrollHint = false,
  dotsInteractive = true,
  onRevealReady,
}: IntroProps) {
  const [showTagline, setShowTagline] = useState(false);
  const [showDots, setShowDots] = useState(false);

  const nameCompleteAt =
    0.05 + (NAME.length - 1) * LETTER_STAGGER + LETTER_DURATION;
  const revealReadyAt = nameCompleteAt + 0.55;

  useEffect(() => {
    const dotsTimer = setTimeout(() => setShowDots(true), 500);
    const taglineTimer = setTimeout(() => setShowTagline(true), nameCompleteAt);
    const readyTimer = setTimeout(() => onRevealReady?.(), revealReadyAt);
    return () => {
      clearTimeout(dotsTimer);
      clearTimeout(taglineTimer);
      clearTimeout(readyTimer);
    };
  }, [nameCompleteAt, revealReadyAt, onRevealReady]);

  return (
    <motion.div
      className="intro-overlay fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-black will-change-transform"
      style={style}
    >
      <div className="intro-grain pointer-events-none absolute inset-0 z-0" aria-hidden />

      <motion.div
        className="intro-dot-grid pointer-events-auto absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: showDots ? 1 : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <DotGrid
          dotSize={3}
          gap={40}
          baseColor="#291f32"
          activeColor="#5b4b78"
          proximity={120}
          shockRadius={150}
          shockStrength={3}
          resistance={500}
          returnDuration={1.2}
          interactive={showDots && dotsInteractive}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none relative z-20 flex flex-col items-center justify-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1
          className="font-galgo-bold intro-name select-none text-stone-100"
          aria-label={NAME}
        >
          {NAME.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="intro-letter inline-block"
              variants={letterVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="font-galgo-light intro-tagline mt-4 select-none uppercase tracking-[0.28em] text-stone-400"
          variants={taglineVariants}
          initial="hidden"
          animate={showTagline ? "visible" : "hidden"}
        >
          {TAGLINE}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollHint ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        aria-hidden={!showScrollHint}
      >
        <span className="font-galgo-light text-[10px] uppercase tracking-[0.35em] text-stone-500">
          Scroll
        </span>
        <motion.span
          className="block h-8 w-px origin-top bg-stone-600"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
