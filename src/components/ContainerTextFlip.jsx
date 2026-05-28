"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ContainerTextFlipDemo() {

  const words = [
    "cinematic",
    "addictive",
    "alive",
    "unforgettable",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="inline-flex items-center justify-center overflow-hidden">

      <AnimatePresence mode="wait">

        <motion.span
          key={words[index]}
          initial={{
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
          }}
          animate={{
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{
            y: -40,
            opacity: 0,
            filter: "blur(8px)",
          }}
          transition={{
            duration: 1.2,
          }}
          className="text-[#5a337a]"
        >
          {words[index]}
        </motion.span>

      </AnimatePresence>

    </div>
  );
}