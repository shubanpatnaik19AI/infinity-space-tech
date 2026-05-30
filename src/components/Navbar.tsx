import { Rocket } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-6 py-3">
        <a href="#top" className="flex items-center gap-2 font-display font-bold tracking-wider">
          <Rocket className="h-5 w-5 text-primary" />
          <span className="text-sm">INFINITY <span className="text-gradient">SPACE TECH</span></span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#mission" className="transition-colors hover:text-foreground">Mission</a>
          <a href="#destinations" className="transition-colors hover:text-foreground">Destinations</a>
          <a href="#roadmap" className="transition-colors hover:text-foreground">Roadmap</a>
          <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
        <a href="#contact" className="rounded-full bg-cosmic px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
          Join Mission
        </a>
      </div>
    </header>
  );
};
