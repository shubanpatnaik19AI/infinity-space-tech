const milestones = [
  { year: "2026", title: "Orbital Test Platform", desc: "Deploy modular research station in low Earth orbit." },
  { year: "2029", title: "Lunar Gateway", desc: "Permanent crewed base on the lunar south pole." },
  { year: "2032", title: "Mars Boots", desc: "First human footprints on Martian soil." },
  { year: "2038", title: "Europa Descent", desc: "Subsurface probe breaches the ice shell of Europa." },
  { year: "2045", title: "Titan Survey", desc: "Atmospheric flight vehicle explores Saturn's largest moon." },
  { year: "2050", title: "Interstellar Sail", desc: "First light-sail launches toward Kepler-442b." },
];

export const Roadmap = () => {
  return (
    <section id="roadmap" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Roadmap</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Trajectory to <span className="text-gradient">infinity</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
          <div className="space-y-8 md:space-y-16">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative grid items-center gap-4 md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div className={`${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <div className="font-display text-5xl font-black text-gradient">{m.year}</div>
                </div>
                <div className="relative rounded-2xl glass p-6">
                  <div className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cosmic shadow-glow md:block"
                       style={{ [i % 2 === 0 ? "left" : "right"]: "-2rem" } as React.CSSProperties} />
                  <h3 className="font-display text-xl font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
