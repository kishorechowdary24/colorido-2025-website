import { MapPin, Mail, Phone, Instagram } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold font-mono text-primary mb-4">
              Colorido 2025
            </h3>
            <p className="text-sm text-muted-foreground">
              A National Level Technical, Cultural & Sports Fest organized by RVR & JC College of Engineering
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-events">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/registration" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-registration">
                  Registration
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>colorido@rvrjc.ac.in</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/place/R.V.R.+%26+J.C.College+of+Engineering/@16.2550606,80.3214494,17z/data=!3m1!4b1!4m6!3m5!1s0x3a4a76e740000001:0xc41c8498715c6da0!8m2!3d16.2550606!4d80.3240243!16zL20vMGZ3Z3J4?entry=ttu&g_ep=EgoyMDI1MTAwNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  data-testid="link-google-maps"
                >
                  RVR & JC College of Engineering, Guntur
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/rvrjcce.official?igsh=MXNrM3k5MzB6ZHJpNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover-elevate active-elevate-2 transition-all"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/school/r.v.r.-&-j.c.-college-of-engineering/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover-elevate active-elevate-2 transition-all"
                aria-label="LinkedIn"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Colorido - RVR & JC College of Engineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
