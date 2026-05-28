/**
 * Edit this file to change the homepage after the intro scroll.
 * Each key is a named region you can customize.
 */

export type TemplateButton = {
  label: string;
  href: string;
};

export type HomeTemplate = {
  shapeGrid: {
    speed: number;
    squareSize: number;
    direction: "diagonal" | "up" | "right" | "down" | "left";
    borderColor: string;
    hoverFillColor: string;
    shape: "square" | "hexagon" | "circle" | "triangle";
    hoverTrailAmount: number;
    trailFadeMs: number;
  };

  taskbar: {
    brand: string;
    links: { id: string; label: string; href: string }[];
  };

  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;

    titleSize: string;
    subtitleSize: string;

    portfolioColor: string;
    yearColor: string;
  };

  button1: TemplateButton;
  button2: TemplateButton;
};

export const homeTemplate: HomeTemplate = {
  shapeGrid: {
    speed: 0.28,
    squareSize: 40,
    direction: "diagonal",
    borderColor: "rgba(91, 75, 120, 0.24)",
    hoverFillColor: "#222",
    shape: "hexagon",
    hoverTrailAmount: 80,
    trailFadeMs: 1000,
  },

  taskbar: {
    brand: "Dhimant Jaiswal",

    links: [
      {
        id: "works",
        label: "Works",
        href: "#works",
      },

      {
        id: "studio",
        label: "Studio",
        href: "#studio",
      },

      {
        id: "contact",
        label: "Contact",
        href: "#contact",
      },
    ],
  },

  hero: {
    eyebrow: "",

    title: "Portfolio 2026",

    subtitle: "Designing - Editing - Filmmaking.",

    titleSize: "text-[5rem] md:text-[10rem]",

    subtitleSize: "text-sm md:text-xl",

    portfolioColor: "#5a337a",

    yearColor: "#5a337a",
  },

  button1: {
    label: "View Work",

    href: "#works",
  },

  button2: {
    label: "Let's Talk",

    href: "#contact",
  },
};