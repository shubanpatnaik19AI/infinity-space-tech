import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, MousePointer2, Move3d, Sparkles } from "lucide-react";
import type { GalaxyMarker } from "@/components/GalaxyScene";

const GalaxyScene = lazy(() => import("@/components/GalaxyScene"));

export const Route = createFileRoute("/galaxy")({
  head: () => ({
    meta: [
      { title: "Milky Way Atlas — Infinity Space Tech" },
      { name: "description", content: "Interactive 3D map of the Milky Way. Explore stars, nebulae, the galactic core and our long-horizon missions." },
      { property: "og:title", content: "Milky Way Atlas — Infinity Space Tech" },
      { property: "og:description", content: "Zoom out to the full galaxy and inspect every target on our cartography roadmap." },
    ],
    links: [{ rel: "canonical", href: "/galaxy" }],
  }),
  component: GalaxyPage,
});

function GalaxyPage() {
  const [selected, setSelected] = useState<GalaxyMarker | null>(null);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <Navbar />

      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-pulse-glow rounded-full bg-cosmic" />
                <p className="text-sm text-muted-foreground">Spinning up the galaxy…</p>
              </div>
            </div>
          }
        >
          <GalaxyScene onSelect={setSelected} selected={selected} />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-24 z-20 -translate-x-1/2 md:left-6 md:translate-x-0">
        <Link
          to="/systems"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/50"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Atlas
        </Link>
      </div>

      <div className="pointer-events-none absolute left-6 right-6 top-40 z-10 md:top-32">
        <div className="mx-auto max-w-md text-center md:mx-0 md:text-left">
          <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent">
            <Sparkles className="h-3 w-3" /> Galactic scale
          </p>
          <h1 className="font-display text-3xl font-black md:text-5xl">
            The <span className="text-gradient">Milky Way</span>
          </h1>
          <p className="mt-2 text-xs text-muted-foreground md:text-sm">
            Click a beacon to inspect star systems, nebulae and deep-space relays.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-6 z-10 hidden gap-4 text-xs text-muted-foreground md:flex">
        <div className="flex items-center gap-2 rounded-full glass px-3 py-1.5">
          <Move3d className="h-3.5 w-3.5" /> Drag to orbit
        </div>
        <div className="flex items-center gap-2 rounded-full glass px-3 py-1.5">
          <MousePointer2 className="h-3.5 w-3.5" /> Click a marker
        </div>
      </div>

      {selected && (
        <aside className="absolute bottom-6 right-6 left-6 z-20 md:left-auto md:w-80">
          <div className="rounded-2xl glass p-5 shadow-deep">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-accent">{selected.type}</p>
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
