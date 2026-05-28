"use client";

import ShapeGrid from "@/components/ShapeGrid/ShapeGrid";
import { homeTemplate } from "@/content/homeTemplate";

export default function HomeTemplate() {
  const { shapeGrid, taskbar, hero } = homeTemplate;

  return (
    <section className="home-template relative h-screen w-full overflow-hidden bg-black">
      {/* Background */}
      <div className="home-shapegrid-layer pointer-events-auto absolute inset-0">
        <ShapeGrid
          speed={shapeGrid.speed}
          squareSize={shapeGrid.squareSize}
          direction={shapeGrid.direction}
          borderColor={shapeGrid.borderColor}
          hoverFillColor={shapeGrid.hoverFillColor}
          shape={shapeGrid.shape}
          hoverTrailAmount={shapeGrid.hoverTrailAmount}
          trailFadeMs={shapeGrid.trailFadeMs}
        />
      </div>

      {/* UI */}
      <div className="relative z-10 flex h-full flex-col pointer-events-none">
        
        {/* Top centered name */}
        <header className="fixed top-0 left-0 z-[999] w-full home-taskbar pointer-events-auto flex items-center justify-center px-5 py-3 md:px-8 md:py-4">
          <span className="home-taskbar-brand font-galgo-light text-stone-200">
            {taskbar.brand}
          </span>
        </header>

        {/* Hero */}
        <div className="home-hero flex flex-1 flex-col items-center justify-center px-5 text-center md:px-8">
          <h2 className="home-hero-title font-galgo-bold max-w-4xl text-stone-50">
            {hero.title}
          </h2>

          <p className="home-hero-subtitle font-galgo-light mt-3 uppercase tracking-[0.28em] text-stone-500 md:mt-4">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}