import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Calendar, MapPin, Trophy, ArrowRight } from "lucide-react";
import coloridoPosterPath from "@assets/image_1760027545693.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8 md:mb-12 flex justify-center">
            <img
              src={coloridoPosterPath}
              alt="Colorido 2025 - National Level Technical, Cultural & Sports Fest at RVR & JC College of Engineering"
              className="max-w-full w-full md:max-w-2xl rounded-xl shadow-2xl"
              data-testid="img-colorido-poster"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 text-foreground/90">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium" data-testid="text-event-dates">
                December 17-18, 2025
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">RVR & JC College</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm md:text-base font-medium">₹5,00,000 Prizes</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/registration">
              <Button size="lg" className="w-full sm:w-auto group" data-testid="button-register-hero">
                Register Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline" className="w-full sm:w-auto backdrop-blur-sm bg-background/10" data-testid="button-explore-events">
                Explore Events
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <p className="text-sm md:text-base text-muted-foreground mb-6 uppercase tracking-wider font-semibold">
              Event Starts In
            </p>
            <CountdownTimer />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Attend Colorido 2025?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience an unforgettable blend of technical innovation, cultural celebration, and sporting excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-card border border-card-border hover-elevate">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-chart-2/20 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">50+ Events</h3>
              <p className="text-sm text-muted-foreground">
                Technical competitions, cultural performances, and sports tournaments
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card border border-card-border hover-elevate">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-chart-1/20 flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Big Prizes</h3>
              <p className="text-sm text-muted-foreground">
                Cash prizes worth ₹5,00,000 and exciting rewards
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card border border-card-border hover-elevate">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-chart-3/20 flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Registration Fee</h3>
              <p className="text-sm text-muted-foreground">
                Free participation for all events - join the celebration!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
