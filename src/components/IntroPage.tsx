"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Intro from "./Intro";
import HomeContent from "./HomeContent";

const SCROLL_DISTANCE = 520;
const DISMISS_THRESHOLD = 0.92;

export default function IntroPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [introReady, setIntroReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollEngaged, setScrollEngaged] = useState(false);

  const { scrollY, scrollYProgress } = useScroll({
    container: scrollRef,
  });

  const introY = useTransform(scrollY, [0, SCROLL_DISTANCE], ["0%", "-100%"]);
  const introOpacity = useTransform(scrollY, [0, SCROLL_DISTANCE], [1, 0]);
  const introBlur = useTransform(
    scrollY,
    [0, SCROLL_DISTANCE],
    ["blur(0px)", "blur(10px)"],
  );
  const contentOpacity = useTransform(
    scrollY,
    [0, SCROLL_DISTANCE * 0.35, SCROLL_DISTANCE],
    [0.35, 0.7, 1],
  );

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 12) setScrollEngaged(true);
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (introReady && progress >= DISMISS_THRESHOLD) {
      setIntroComplete(true);
    }
  });

  useEffect(() => {
    if (!introReady || scrollEngaged || introComplete) return;

    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = container.scrollTop + e.deltaY;
      if (next > 0) setScrollEngaged(true);
      container.scrollTop = Math.max(
        0,
        Math.min(container.scrollHeight - container.clientHeight, next),
      );
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [introReady, scrollEngaged, introComplete]);

  const handleRevealReady = useCallback(() => {
    setIntroReady(true);
  }, []);

  useEffect(() => {
    if (introComplete) {
      document.body.style.overflow = "";
      return;
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introComplete]);

  return (
    <div className="relative min-h-screen bg-black">
      <motion.div style={{ opacity: introComplete ? 1 : contentOpacity }}>
        <HomeContent />
      </motion.div>

      {!introComplete && (
        <>
          <Intro
            style={{
              y: introY,
              opacity: introOpacity,
              filter: introBlur,
            }}
            showScrollHint={introReady}
            dotsInteractive={!scrollEngaged}
            onRevealReady={handleRevealReady}
          />

          <div
            ref={scrollRef}
            className={`intro-scroll-layer fixed inset-0 z-50 overflow-y-auto overflow-x-hidden ${
              !introReady
                ? "pointer-events-none overflow-hidden"
                : scrollEngaged
                  ? "intro-scroll-active"
                  : "pointer-events-none"
            }`}
            aria-label="Scroll to enter portfolio"
          >
            <div
              className="w-full"
              style={{ height: introReady ? "160vh" : "100vh" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
