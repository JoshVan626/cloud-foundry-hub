import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Foundry", href: "/#foundry" },
  { label: "Documentation", href: "/docs" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">Northstar Cloud Solutions</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="accent" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="accent" size="sm" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
