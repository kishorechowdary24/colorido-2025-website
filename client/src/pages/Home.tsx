import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Calendar, MapPin, Trophy, ArrowRight, Users, Award } from "lucide-react";
import coloridoPosterPath from "@assets/image_1760027545693.png";
import type { Event } from "@shared/schema";

export default function Home() {
  const { data: events } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const topPrizeEvents = events
    ?.sort((a, b) => {
      const prizeA = parseInt(a.prize.replace(/[^0-9]/g, ""));
      const prizeB = parseInt(b.prize.replace(/[^0-9]/g, ""));
      return prizeB - prizeA;
    })
    .slice(0, 3);

  const mostRegisteredEvents = events
    ?.sort((a, b) => b.participantCount - a.participantCount)
    .slice(0, 3);

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
              <h3 className="text-xl font-semibold mb-2">40+ Events</h3>
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

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Event Highlights
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out our top events with the biggest prizes and highest participation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Top Prize Events</h3>
              </div>
              <div className="space-y-4">
                {topPrizeEvents?.map((event, index) => (
                  <Card key={event.id} className="p-4 hover-elevate" data-testid={`card-top-prize-${index}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{event.category}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-primary font-semibold">
                            <Trophy className="w-4 h-4" />
                            {event.prize}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {event.participantCount}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Link href={`/registration?eventId=${event.id}`}>
                          <Button size="sm" data-testid={`button-register-top-prize-${index}`}>
                            Register
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Most Popular Events</h3>
              </div>
              <div className="space-y-4">
                {mostRegisteredEvents?.map((event, index) => (
                  <Card key={event.id} className="p-4 hover-elevate" data-testid={`card-popular-${index}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{event.category}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-primary font-semibold">
                            <Users className="w-4 h-4" />
                            {event.participantCount} registered
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Trophy className="w-4 h-4" />
                            {event.prize}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Link href={`/registration?eventId=${event.id}`}>
                          <Button size="sm" data-testid={`button-register-popular-${index}`}>
                            Register
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/events">
              <Button size="lg" variant="outline" data-testid="button-view-all-events">
                View All 40+ Events
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
