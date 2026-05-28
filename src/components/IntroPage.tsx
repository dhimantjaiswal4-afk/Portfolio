"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import { useCallback, useRef, useState } from "react";

import Intro from "./Intro";
import HomeContent from "./HomeContent";

const SCROLL_DISTANCE = 520;
const DISMISS_THRESHOLD = 0.35;

export default function IntroPage() {

  const scrollRef = useRef<HTMLDivElement>(null);

  const [introReady, setIntroReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const { scrollY, scrollYProgress } = useScroll({
    container: scrollRef,
  });

  const introY = useTransform(
    scrollY,
    [0, SCROLL_DISTANCE],
    ["0%", "-100%"]
  );

  const introOpacity = useTransform(
    scrollY,
    [0, SCROLL_DISTANCE],
    [1, 0]
  );

  const introBlur = useTransform(
    scrollY,
    [0, SCROLL_DISTANCE],
    ["blur(0px)", "blur(10px)"]
  );

  const contentOpacity = useTransform(
    scrollY,
    [0, SCROLL_DISTANCE * 0.35, SCROLL_DISTANCE],
    [0.35, 0.7, 1]
  );

 useMotionValueEvent(scrollYProgress, "change", (progress) => {

  if (introReady && progress >= DISMISS_THRESHOLD) {

    setIntroComplete(true);

    document.body.style.overflow = "auto";
    document.body.style.touchAction = "auto";

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }
});

  const handleRevealReady = useCallback(() => {
    setIntroReady(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">

      {/* MAIN CONTENT */}
      <motion.div
        style={{
          opacity: introComplete ? 1 : contentOpacity,
        }}
      >
        <HomeContent />
      </motion.div>

      {/* INTRO */}
      {!introComplete && (

        <>

          <Intro
            style={{
              y: introY,
              opacity: introOpacity,
              filter: introBlur,
            }}
            showScrollHint={introReady}
            dotsInteractive={false}
            onRevealReady={handleRevealReady}
          />

          {/* MOBILE SAFE SCROLL LAYER */}
          <div
            ref={scrollRef}
            className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden touch-pan-y"
            aria-label="Scroll to enter portfolio"
          >

            <div
              className="w-full"
              style={{
                height: introReady ? "220vh" : "100vh",
              }}
            />

          </div>

        </>
      )}

    </div>
  );
}