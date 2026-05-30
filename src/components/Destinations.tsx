import mars from "@/assets/planet-mars.jpg";
import europa from "@/assets/planet-europa.jpg";
import exo from "@/assets/planet-exo.jpg";

const destinations = [
  {
    img: mars,
    name: "Mars",
    tag: "2032 — Crewed Landing",
    desc: "Establishing the first permanent human outpost in the red dust of Arcadia Planitia.",
    distance: "225M km",
  },
  {
    img: europa,
    name: "Europa",
    tag: "2038 — Ice Drill Probe",
    desc: "Piercing 20 km of ice to seek life in the subsurface ocean of Jupiter's brightest moon.",
    distance: "628M km",
  },
  {
    img: exo,
    name: "Kepler-442b",
    tag: "2050 — Light-Sail Mission",
    desc: "A century-class voyage to a habitable-zone exoplanet 1,200 light years away.",
    distance: "1,206 ly",
  },
];

export const Destinations = () => {
  return (
    <section id="destinations" className="relative py-32 bg-aurora">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Destinations</p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Worlds on the <span className="text-gradient">horizon</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Three flagship targets define our trajectory across the next half-century.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {destinations.map((d, i) => (
            <article
              key={d.name}
              className="group relative overflow-hidden rounded-3xl glass shadow-deep transition-transform hover:-translate-y-2"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={d.img}
                  alt={`${d.name} viewed from orbit`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold">{d.name}</h3>
                  <span className="text-xs text-muted-foreground">{d.distance}</span>
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">{d.tag}</p>
                <p className="mt-4 text-sm text-muted-foreground">{d.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
