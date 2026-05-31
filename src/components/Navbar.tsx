import { Rocket } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 w-full px-4">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-6 py-3">
        <Link to="/" className="flex items-center gap-2 font-display font-bold tracking-wider">
          <Rocket className="h-5 w-5 text-primary" />
          <span className="text-sm">INFINITY <span className="text-gradient">SPACE TECH</span></span>
        </Link>
        <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/" hash="mission" className="transition-colors hover:text-foreground">Mission</Link>
          <Link to="/" hash="roadmap" className="transition-colors hover:text-foreground">Roadmap</Link>
          <Link to="/space-map" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Solar</Link>
          <Link to="/systems" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Systems</Link>
          <Link to="/galaxy" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Galaxy</Link>
        </nav>
        <Link to="/galaxy" className="rounded-full bg-cosmic px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105">
          Open Atlas
        </Link>
      </div>
    </header>
  );
};
