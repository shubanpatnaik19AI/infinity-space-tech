export type SystemPlanet = {
  name: string;
  color: string;
  emissive: string;
  size: number;
  distance: number;
  speed: number;
  desc: string;
  mission: string;
  ring?: boolean;
};

export type StarSystem = {
  slug: string;
  name: string;
  subtitle: string;
  distanceLy: string;
  classification: string;
  blurb: string;
  star: {
    color: string;
    emissive: string;
    size: number;
    intensity: number;
    light: string;
  };
  planets: SystemPlanet[];
};

export const SYSTEMS: StarSystem[] = [
  {
    slug: "trappist-1",
    name: "TRAPPIST-1",
    subtitle: "Ultra-cool dwarf · 7 terrestrial worlds",
    distanceLy: "40.7 light-years",
    classification: "M8V red dwarf",
    blurb:
      "A compact system of seven Earth-sized planets, three within the habitable zone. Our flagship interstellar target for biosignature surveys.",
    star: { color: "#fb7185", emissive: "#9f1239", size: 0.9, intensity: 2.2, light: "#fecaca" },
    planets: [
      { name: "TRAPPIST-1b", color: "#a8a29e", emissive: "#44403c", size: 0.45, distance: 3, speed: 1.4, desc: "Scorched inner world", mission: "Thermal mapper — 2052" },
      { name: "TRAPPIST-1c", color: "#fbbf24", emissive: "#78350f", size: 0.5, distance: 4.2, speed: 1.1, desc: "Venus-like crust", mission: "Atmosphere probe — 2054" },
      { name: "TRAPPIST-1d", color: "#fde68a", emissive: "#92400e", size: 0.38, distance: 5.5, speed: 0.95, desc: "Edge of habitability", mission: "Surface lander — 2056" },
      { name: "TRAPPIST-1e", color: "#34d399", emissive: "#065f46", size: 0.46, distance: 6.8, speed: 0.8, desc: "Prime habitable candidate", mission: "Crewed flyby — 2061" },
      { name: "TRAPPIST-1f", color: "#60a5fa", emissive: "#1e3a8a", size: 0.5, distance: 8, speed: 0.65, desc: "Ocean world", mission: "Submersible relay — 2063" },
      { name: "TRAPPIST-1g", color: "#a78bfa", emissive: "#4c1d95", size: 0.6, distance: 9.6, speed: 0.5, desc: "Icy super-Earth", mission: "Cryo drill — 2067" },
      { name: "TRAPPIST-1h", color: "#cbd5e1", emissive: "#334155", size: 0.4, distance: 11.4, speed: 0.4, desc: "Frozen outpost", mission: "Beacon array — 2070" },
    ],
  },
  {
    slug: "alpha-centauri",
    name: "Alpha Centauri",
    subtitle: "Triple-star system · nearest neighbor",
    distanceLy: "4.37 light-years",
    classification: "G2V + K1V + M5.5Ve",
    blurb:
      "Humanity's closest stellar neighbor. The Breakthrough Starshot relay and Proxima b survey form the cornerstone of our interstellar program.",
    star: { color: "#fde68a", emissive: "#b45309", size: 1.4, intensity: 2.4, light: "#fffbeb" },
    planets: [
      { name: "Proxima b", color: "#f87171", emissive: "#7f1d1d", size: 0.55, distance: 4, speed: 1.0, desc: "Tidally locked, habitable zone", mission: "Starshot flyby — 2048" },
      { name: "Proxima c", color: "#93c5fd", emissive: "#1e3a8a", size: 0.8, distance: 7, speed: 0.55, desc: "Super-Earth, icy mantle", mission: "Orbital telescope — 2055" },
      { name: "Proxima d", color: "#f0abfc", emissive: "#701a75", size: 0.35, distance: 5.2, speed: 0.85, desc: "Sub-Earth, scorched", mission: "Dust-shield test — 2050" },
      { name: "α Cen Bb", color: "#fb923c", emissive: "#7c2d12", size: 0.45, distance: 9.5, speed: 0.45, desc: "Companion-star world", mission: "Multi-star survey — 2058" },
    ],
  },
  {
    slug: "kepler-90",
    name: "Kepler-90",
    subtitle: "Eight-planet analog of our own",
    distanceLy: "2,545 light-years",
    classification: "G-type main sequence",
    blurb:
      "The first known system to rival the Sun in planet count. A long-horizon target for AI-piloted generational probes and deep-time imaging.",
    star: { color: "#fef08a", emissive: "#854d0e", size: 1.6, intensity: 2.6, light: "#fefce8" },
    planets: [
      { name: "Kepler-90b", color: "#d6d3d1", emissive: "#44403c", size: 0.45, distance: 3.5, speed: 1.3, desc: "Hot rocky inner", mission: "Resonance study" },
      { name: "Kepler-90c", color: "#fca5a5", emissive: "#7f1d1d", size: 0.5, distance: 4.8, speed: 1.0, desc: "Greenhouse world", mission: "Spectra capture" },
      { name: "Kepler-90i", color: "#86efac", emissive: "#14532d", size: 0.42, distance: 6, speed: 0.85, desc: "Discovered by AI", mission: "Bio-signature scan" },
      { name: "Kepler-90d", color: "#fcd34d", emissive: "#78350f", size: 0.7, distance: 7.5, speed: 0.7, desc: "Mid-system mini-Neptune", mission: "Atmosphere mapper" },
      { name: "Kepler-90e", color: "#7dd3fc", emissive: "#075985", size: 0.8, distance: 9, speed: 0.55, desc: "Frozen mini-Neptune", mission: "Cryo lander" },
      { name: "Kepler-90f", color: "#c4b5fd", emissive: "#4c1d95", size: 0.85, distance: 10.8, speed: 0.45, desc: "Distant ice giant", mission: "Magnetosphere probe" },
      { name: "Kepler-90g", color: "#fdba74", emissive: "#7c2d12", size: 1.2, distance: 13, speed: 0.3, desc: "Gas giant", ring: true, mission: "Ring-system survey" },
      { name: "Kepler-90h", color: "#fcd34d", emissive: "#78350f", size: 1.4, distance: 16, speed: 0.22, desc: "Jupiter analog", mission: "Trojan asteroid lab" },
    ],
  },
];

export const getSystem = (slug: string) => SYSTEMS.find((s) => s.slug === slug);
