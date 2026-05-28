"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const LogoLoop = dynamic(() => import("./LogoLoop"), {
  ssr: false,
});

import HomeTemplate from "./HomeTemplate";
import TextPressure from "./TextPressure";
import FilmPanels from "./FilmPanels";
import OrbitImages from "./OrbitImages";
import ScrollReveal from "./ScrollReveal";
const ContainerTextFlipDemo = dynamic(
  () => import("./ContainerTextFlip").then((mod) => mod.ContainerTextFlipDemo),
  { ssr: false }
);
const stills = [
  "/photos/p1.jpeg",
  "/photos/p2.jpeg",
  "/photos/p3.jpeg",
  "/photos/p4.jpeg",
  "/photos/p5.jpeg",
  "/photos/p6.jpeg",
  "/photos/p8.jpeg",
];

export default function HomeContent() {
  return (
    <>
      <main>
        <HomeTemplate />
      </main>

      {/* WORKS HERO */}
      <section className="bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* FIND ME */}
        <p className="text-white/25 uppercase tracking-[0.45em] text-sm md:text-base font-bold">
          FIND ME HERE ↓
        </p>

        {/* LOGO LOOP */}
        <div className="w-full overflow-hidden py-20 opacity-30">

          <LogoLoop
            // @ts-ignore
            logos={[
              {
                src: "/logos/instagram.svg",
                alt: "Instagram",
                href: "https://www.instagram.com/dhimant_jaiswal/",
              },

              {
                src: "/logos/linkedin.svg",
                alt: "LinkedIn",
                href: "https://www.linkedin.com/in/dhimantjaiswal/",
              },

              {
                src: "/logos/github.svg",
                alt: "GitHub",
                href: "https://github.com/dhimantjaiswal4-afk",
              },

              {
                src: "/logos/youtube.svg",
                alt: "YouTube",
                href: "https://www.youtube.com/@dhimant-jaiswal",
              },

              {
                src: "/logos/spotify.svg",
                alt: "Spotify",
                href: "https://open.spotify.com/user/d3tyw73wzg6cp396drtg3eh12",
              },

              {
                src: "/logos/brave.svg",
                alt: "Brave",
                href: "https://brave.com",
              },
            ]}

            speed={50}
            direction="right"
            logoHeight={60}
            gap={110}
            hoverSpeed={0}
            fadeOut
            fadeOutColor="#000"
            scaleOnHover
            ariaLabel="Creative links"
          />

        </div>

        {/* WORKS TITLE */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "360px",
          }}
        >
          <TextPressure
            text="WORKS!"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#5a337a"
            minFontSize={12}
          />
        </div>

        {/* SHORT FILMS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="relative"
        >
          <h3 className="text-white/50 uppercase tracking-[0.6em] text-lg md:text-2xl font-light">
            SHORT FILMS
          </h3>
        </motion.div>

      </section>

      {/* INTERACTIVE FILM PANELS */}
      <FilmPanels />

      {/* STILLS SECTION */}
      <section className="relative bg-[black] min-h-[140vh] overflow-hidden border-t border-white/10 flex items-center justify-center">

        {/* ORBIT */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pt-10">

          <OrbitImages
            // @ts-ignore
            images={stills}

            shape="ellipse"

            baseWidth={1000}

            radiusX={400
            }
            radiusY={230
            }

            rotation={-8}

            duration={55}

            itemSize={90}

            direction="normal"

            fill={true}

            responsive={true}

            showPath={true}
            pathColor="rgba(189, 185, 192, 0.6)"
pathWidth={2}

            width={1000}
            height={1000}

            easing="linear"
          />

        </div>

        {/* CENTER GLOW */}
        <div className="absolute w-[520px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#090909_45%,#000000_100%)]/95 blur-3xl z-10" />

        {/* CENTER TEXT */}
        <div className="relative z-20 text-center pointer-events-none">

          <h2 className="text-white text-7xl md:text-[10rem] font-light tracking-tight">
            STILLS
          </h2>

          <p className="mt-6 text-white/40 uppercase tracking-[0.45em] text-sm">
            Digital compositions · Experimental imagery
          </p>

        </div>
<div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-black pointer-events-none z-30" />
      </section>
{/* REELS SECTION */}
<section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#090014] to-black flex flex-col items-center justify-start pt-32 px-6">

  

  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="relative z-10 text-center max-w-6xl"
  >

    <p className="mb-6 text-white/20 uppercase tracking-[0.5em] text-xs md:text-sm">
      REELS
    </p>

    <h2 className="text-white font-bold leading-[0.9] tracking-[-10 px]
    text-5xl md:text-8xl">

      Make your work feel{" "}

      <span className="text-[#5a337a]">
        <ContainerTextFlipDemo />
      </span>

    </h2>

    <p className="mt-10 max-w-2xl mx-auto text-white/40 text-base md:text-xl leading-relaxed">
      Short-form visuals crafted with cinematic pacing,
      emotional storytelling, sharp transitions,
      and motion designed to hold attention. 
      Let's Work Together.
    </p>

  </motion.div>

</section>
  {/* CONTACT SECTION */}
<section
  id="contact"
  className="relative bg-black overflow-hidden px-8 py-40 md:px-20"
>
  
  <div className="max-w-6xl mx-auto">

    {/* SMALL LABEL */}
    <p className="mb-10 text-white/20 uppercase tracking-[0.5em] text-xs md:text-sm">
      CONTACT
    </p>

    {/* SCROLL REVEAL TEXT */}
    <ScrollReveal
      baseOpacity={1}
      containerClassName="mb-28"
      textClassName="text-white font-semibold leading-[1.25]"
    >
      I care about building meaningful and creative with people who value growth,
      trust, originality, and long-term vision over noise, ego, or short-term attention.
      Whether it’s filmmaking, editing, design, or storytelling, I focus on creating
      work that actually feels human, cinematic, and emotionally memorable.
    </ScrollReveal>

    {/* CONTACT INFO */}
    <div className="grid md:grid-cols-2 gap-20 border-t border-white/10 pt-16">

      {/* LEFT */}
      <div>

        <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight">
          Let’s build
          <br />
          something real.
        </h2>

      </div>

      {/* RIGHT */}
      <div className="space-y-10">

        <div>
          <p className="text-white/30 uppercase tracking-[0.4em] text-xs mb-3">
            EMAIL
          </p>

          <a
            href="mailto:dhimantjaiswal4@gmail.com"
            className="text-white text-2xl md:text-3xl hover:text-[#5a337a] transition-colors duration-300"
          >
            dhimantjaiswal4@gmail.com
          </a>
        </div>

        <div>
          <p className="text-white/30 uppercase tracking-[0.4em] text-xs mb-3">
            PHONE
          </p>

          <a
            href="tel:+917003738420"
            className="text-white text-2xl md:text-3xl hover:text-[#5a337a] transition-colors duration-300"
          >
            +91 70037 38420
          </a>
        </div>

      </div>

    </div>

    {/* FOOTER */}
    <div className="mt-32 border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">

      <p className="text-white/25 text-sm tracking-[0.3em] uppercase">
        Dhimant Jaiswal — Portfolio 2026
      </p>

      <p className="text-white/20 text-sm">
        Design · Film · Editing · Visual Storytelling
      </p>

    </div>

  </div>

</section>
    </>
  );
}