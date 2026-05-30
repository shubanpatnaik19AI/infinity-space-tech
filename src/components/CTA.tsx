import { Rocket } from "lucide-react";
import { Starfield } from "./Starfield";

export const CTA = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <Starfield />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cosmic shadow-glow animate-float">
          <Rocket className="h-7 w-7 text-primary-foreground" />
        </div>
        <h2 className="font-display text-4xl font-bold md:text-6xl">
          Be part of the <span className="text-gradient">voyage</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Mission updates, launch announcements, and behind-the-scenes engineering — delivered from the edge of the known.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="commander@earth.io"
            className="flex-1 rounded-full glass px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-full bg-cosmic px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Enlist
          </button>
        </form>
      </div>
    </section>
  );
};
