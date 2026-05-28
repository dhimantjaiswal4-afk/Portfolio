import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  baseOpacity?: number;
  containerClassName?: string;
  textClassName?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  baseOpacity = 0.2,
  containerClassName = "",
  textClassName = "",
  wordAnimationEnd = "bottom 70%",
}) => {

  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {

    const text = typeof children === "string" ? children : "";

    return text.split(/(\s+)/).map((word, index) => {

      if (word.match(/^\s+$/)) return word;

      return (
        <span className="word" key={index}>
          {word}
        </span>
      );

    });

  }, [children]);

  useEffect(() => {

    const el = containerRef.current;

    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    gsap.fromTo(
      wordElements,
      {
        opacity: baseOpacity,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 88%",
          end: wordAnimationEnd,
          scrub: false,
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

  }, [scrollContainerRef, baseOpacity, wordAnimationEnd]);

  return (
    <h2
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`}
    >
      <p className={`scroll-reveal-text ${textClassName}`}>
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;