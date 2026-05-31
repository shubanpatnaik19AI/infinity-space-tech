import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Sparkles, Telescope } from "lucide-react";
import { SYSTEMS } from "@/lib/systems-data";

export const Route = createFileRoute("/systems/")({
  head: () => ({
    meta: [
      { title: "Star Systems Atlas — Infinity Space Tech" },
      { name: "description", content: "Interactive atlas of star systems we plan to chart: TRAPPIST-1, Alpha Centauri, Kepler-90 and more." },
      { property: "og:title", content: "Star Systems Atlas — Infinity Space Tech" },
      { property: "og:description", content: "Explore 3D cartography for every star system on our roadmap." },
    ],
    links: [{ rel: "canonical", href: "/systems" }],
  }),
  component: SystemsIndex,
});

function SystemsIndex() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 pt-36 pb-24">
        <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent">
          <Telescope className="h-3 w-3" /> Cartography Atlas
        </p>
        <h1 className="font-display text-4xl font-black md:text-6xl">
          <span className="text-gradient">Star Systems</span> on our Map
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          Every system we plan to reach, surveyed in three dimensions. Tap a card to enter its interactive 3D chart and inspect every planned mission.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SYSTEMS.map((s) => (
            <Link
              key={s.slug}
              to="/systems/$slug"
              params={{ slug: s.slug }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
                style={{ background: s.star.color }}
              />
              <p className="text-xs uppercase tracking-wider text-accent">{s.classification}</p>
              <h2 className="mt-2 font-display text-2xl font-bold">{s.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{s.subtitle}</p>
              <p className="mt-4 text-sm text-foreground/80">{s.blurb}</p>
              <div className="mt-6 flex items-center justify-between text-xs">
                <span className="rounded-full bg-secondary/50 px-3 py-1 text-muted-foreground">{s.distanceLy}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary">
                  Enter chart <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}

          <Link
            to="/galaxy"
            className="group relative overflow-hidden rounded-2xl border border-primary/40 bg-cosmic/30 p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-nebula/40 opacity-50 blur-3xl transition-opacity group-hover:opacity-80" />
            <p className="text-xs uppercase tracking-wider text-accent">Galactic Scale</p>
            <h2 className="mt-2 font-display text-2xl font-bold">The Milky Way</h2>
            <p className="mt-1 text-xs text-muted-foreground">200 billion stars · 100,000 ly across</p>
            <p className="mt-4 text-sm text-foreground/80">
              Zoom out to the full galactic map. Track every system, nebula, and intergalactic beacon on our long-horizon agenda.
            </p>
            <div className="mt-6 flex items-center justify-between text-xs">
              <span className="rounded-full bg-secondary/50 px-3 py-1 text-muted-foreground">All targets</span>
              <span className="inline-flex items-center gap-1 font-semibold text-primary">
                Open galaxy <Sparkles className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
