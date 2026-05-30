import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, MousePointer2, Move3d, Sparkles } from "lucide-react";
import type { PlanetData } from "@/components/SolarScene";

const SolarScene = lazy(() => import("@/components/SolarScene"));

export const Route = createFileRoute("/space-map")({
  head: () => ({
    meta: [
      { title: "3D Space Map — Infinity Space Tech" },
      { name: "description", content: "Interactive 3D map of our solar system and beyond. Explore planned missions across planets and exoplanets." },
      { property: "og:title", content: "3D Space Map — Infinity Space Tech" },
      { property: "og:description", content: "Navigate an interactive 3D map of our future missions across the solar system." },
      { property: "og:url", content: "/space-map" },
    ],
    links: [{ rel: "canonical", href: "/space-map" }],
  }),
  component: SpaceMapPage,
});

function SpaceMapPage() {
  const [selected, setSelected] = useState<PlanetData | null>(null);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <Navbar />

      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-pulse-glow rounded-full bg-cosmic" />
                <p className="text-sm text-muted-foreground">Calibrating starfield…</p>
              </div>
            </div>
          }
        >
          <SolarScene onSelect={setSelected} selected={selected} />
        </Suspense>
      </div>

      {/* Top-left back link */}
      <div className="pointer-events-none absolute left-1/2 top-24 z-20 -translate-x-1/2 md:left-6 md:translate-x-0">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to base
        </Link>
      </div>

      {/* Title overlay */}
      <div className="pointer-events-none absolute left-6 right-6 top-40 z-10 md:top-32">
        <div className="mx-auto max-w-md text-center md:mx-0 md:text-left">
          <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent">
            <Sparkles className="h-3 w-3" /> Live Map
          </p>
          <h1 className="font-display text-3xl font-black md:text-5xl">
            <span className="text-gradient">Mission</span> Cartography
          </h1>
          <p className="mt-2 text-xs text-muted-foreground md:text-sm">
            Click a planet to view its mission brief. Drag to rotate, scroll to zoom.
          </p>
        </div>
      </div>

      {/* Controls hint */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-10 hidden gap-4 text-xs text-muted-foreground md:flex">
        <div className="flex items-center gap-2 rounded-full glass px-3 py-1.5">
          <Move3d className="h-3.5 w-3.5" /> Drag to orbit
        </div>
        <div className="flex items-center gap-2 rounded-full glass px-3 py-1.5">
          <MousePointer2 className="h-3.5 w-3.5" /> Click a planet
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <aside className="absolute bottom-6 right-6 left-6 z-20 md:left-auto md:w-80">
          <div className="rounded-2xl glass p-5 shadow-deep">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-accent">Selected</p>
                <h2 className="font-display text-2xl font-bold">{selected.name}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{selected.desc}</p>
            <div className="mt-4 rounded-xl bg-secondary/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Planned Mission</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{selected.mission}</p>
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}
