"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const films = [
  {
    title: "The Plan",
    video: "/videos/myfilm1.mp4",
    awards: [
      "2nd · Christ (YPR)",
      "42+ Applicants",
      "3rd · Blossoms Film Festival",
      "120+ Applicants",
    ],
  },

  {
    title: "Universe, Please",
    video: "/videos/film2.mp4",
    awards: [
      "1st · SJCC Film Festival",
      "20+ Applicants",
    ],
  },

  {
    title: "Wi-Fi",
    video: "/videos/myfilm3.mp4",
    awards: [
      "Experimental Cinema",
    ],
  },
];

export default function FilmPanels() {
  const [active, setActive] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <section className="bg-black h-screen flex overflow-hidden">
      {films.map((film, index) => {
        const isActive = active === index;

        return (
          <motion.div
            key={film.title}
            onMouseEnter={() => {
              setActive(index);

              const currentVideo = videoRefs.current[index];

              if (currentVideo) {
                currentVideo.play().catch(() => {});
              }
            }}
            onMouseLeave={() => {
              const currentVideo = videoRefs.current[index];

              if (currentVideo) {
                currentVideo.pause();
              }
            }}
            animate={{
              flex: isActive ? 5 : 1,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden border-l border-white/10"
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              muted={!soundEnabled || !isActive}
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={film.video} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40" />

            <motion.div
              animate={{
                opacity: isActive ? 1 : 0.5,
                y: isActive ? 0 : 30,
              }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 p-10"
            >
              <h2 className="text-white text-5xl font-light tracking-tight">
                {film.title}
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {film.awards.map((award) => (
                  <span
                    key={award}
                    className="border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm"
                  >
                    {award}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setSoundEnabled((prev) => !prev);
                }}
                className="mt-6 border border-white/15 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:bg-white hover:text-black"
              >
                {soundEnabled ? "Sound Off" : "Sound On"}
              </button>
            </motion.div>
          </motion.div>
        );
      })}
    </section>
  );
}