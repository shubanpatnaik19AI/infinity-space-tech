import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Destinations } from "@/components/Destinations";
import { Roadmap } from "@/components/Roadmap";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Infinity Space Tech — Pioneering the Next Epoch of Exploration" },
      { name: "description", content: "Infinity Space Tech charts humanity's future across Mars, Europa, and distant exoplanets through next-generation propulsion, habitats, and quantum comms." },
      { property: "og:title", content: "Infinity Space Tech" },
      { property: "og:description", content: "Pioneering humanity's leap into the cosmos — from Mars colonies to interstellar voyages." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Mission />
      <Destinations />
      <Roadmap />
      <CTA />
      <Footer />
    </main>
  );
}
