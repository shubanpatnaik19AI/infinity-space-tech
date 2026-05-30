import heroImg from "@/assets/hero-space.jpg";
import { ArrowRight, Sparkles } from "lucide-react";
import { Starfield } from "./Starfield";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Spacecraft approaching an exoplanet through a violet nebula"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>
      <Starfield />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-accent" />
          Charting the unexplored
        </div>
        <h1 className="font-display text-5xl font-black leading-[1.05] md:text-7xl lg:text-8xl">
          <span className="text-gradient">Infinity</span>
          <br />
          Space Tech
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Pioneering humanity's next leap — from Martian colonies to the icy oceans of Europa
          and the rings of distant exoplanets. The cosmos is the canvas. We are the brush.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#destinations"
            className="group inline-flex items-center gap-2 rounded-full bg-cosmic px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow animate-pulse-glow"
          >
            Explore Destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#mission"
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/50"
          >
            Our Mission
          </a>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 text-left md:gap-16">
          {[
            { k: "12", v: "Missions planned" },
            { k: "2032", v: "First crewed Mars launch" },
            { k: "∞", v: "Horizons ahead" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-3xl font-bold text-gradient md:text-4xl">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
