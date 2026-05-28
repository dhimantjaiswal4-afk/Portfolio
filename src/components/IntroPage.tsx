"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Intro from "./Intro";
import HomeContent from "./HomeContent";

export default function IntroPage() {

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {

    const handleScroll = () => {

      setShowIntro(false);

      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };

    window.addEventListener("wheel", handleScroll, {
      passive: true,
    });

    window.addEventListener("touchmove", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };

  }, []);

  return (
    <div className="relative bg-black overflow-x-hidden">

      {/* MAIN CONTENT */}
      <HomeContent />

      {/* INTRO OVERLAY */}
      <AnimatePresence>

        {showIntro && (

          <motion.div
            initial={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: "-100%",
              filter: "blur(10px)",
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[999] bg-black"
          >

            <Intro
              showScrollHint={true}
              dotsInteractive={false}
              onRevealReady={() => {}}
            />

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}