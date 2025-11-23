import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/registration", label: "Registration" },
    { href: "/hospitality", label: "Hospitality & Transportation" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-home-logo">
            <div className="flex items-center gap-3 cursor-pointer hover-elevate rounded-md px-3 py-2 -ml-3">
              <div
                className={`text-xl font-bold font-mono ${
                  isScrolled ? "text-white" : "text-maroon"
                }`}
              >
                Colorido 2025
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`relative ${
                     isScrolled
                      ? "text-white"
                      : "text-maroon"
                  }`}
                  data-testid={`link-nav-${link.label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {link.label}
                  {location === link.href && (
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 rounded-full ${
                       isScrolled
                          ? "bg-white"
                          : "bg-maroon"
                      }`}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Register Button */}
          <div className="hidden md:block">
            <Link href="/registration">
              <Button
                variant="default"
                className="text-white" // Always white
                data-testid="button-register-nav"
              >
                Register Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover-elevate rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  isScrolled ? "text-white" : "text-maroon"
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  isScrolled ? "text-white" : "text-maroon"
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden ${
            isScrolled ? "bg-primary" : "bg-transparent"
          } border-t border-border`}
          data-testid="mobile-menu"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    link.label === "Registration"
                      ? "text-white" // Register always white
                      : isScrolled
                      ? "text-white"
                      : "text-maroon"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/registration">
              <Button
                variant="default"
                className="w-full mt-2 text-white" // Always white
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="button-register-mobile"
              >
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
