import { Telescope, Atom, Globe2, Radio } from "lucide-react";

const pillars = [
  { icon: Telescope, title: "Deep Observation", desc: "Next-gen telescopic arrays mapping exoplanets in unprecedented detail." },
  { icon: Atom, title: "Propulsion Frontier", desc: "Ion drives and fusion concepts to shrink interplanetary travel time." },
  { icon: Globe2, title: "Habitat Engineering", desc: "Self-sustaining biomes designed for Mars, the Moon and beyond." },
  { icon: Radio, title: "Quantum Comms", desc: "Light-speed entangled signals linking colonies across the solar system." },
];

export const Mission = () => {
  return (
    <section id="mission" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Our Mission</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Engineering the <span className="text-gradient">next epoch</span> of exploration
          </h2>
          <p className="mt-5 text-muted-foreground">
            We build the technology, vessels, and ecosystems that will carry the first
            generation of interplanetary explorers — and the science to bring them home.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cosmic">
                <p.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
