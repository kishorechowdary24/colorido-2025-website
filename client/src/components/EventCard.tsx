import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Users, Calendar, Clock, Trophy } from "lucide-react";
import { Link } from "wouter";
import type { Event } from "@shared/schema";
import * as LucideIcons from "lucide-react";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "technical":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30";
      case "cultural":
        return "bg-chart-1/20 text-chart-1 border-chart-1/30";
      case "sports":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const IconComponent = event.icon
    ? (LucideIcons[event.icon as keyof typeof LucideIcons] as any)
    : LucideIcons.Trophy;

  return (
    <Card
      className="p-6 hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-lg group flex flex-col h-full"
      data-testid={`card-event-${event.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          <IconComponent className="w-6 h-6" />
        </div>
        <Badge className={`${getCategoryColor(event.category)} border`} data-testid={`badge-category-${event.category.toLowerCase()}`}>
          {event.category}
        </Badge>
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors" data-testid={`text-event-title-${event.id}`}>
        {event.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow" data-testid={`text-event-description-${event.id}`}>
        {event.description}
      </p>

      {event.department && (
        <div className="text-xs text-muted-foreground mb-3">
          {event.department}
        </div>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span data-testid={`text-event-date-${event.id}`}>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span data-testid={`text-event-time-${event.id}`}>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Trophy className="w-4 h-4" />
          <span data-testid={`text-event-prize-${event.id}`}>{event.prize}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span data-testid={`text-participant-count-${event.id}`}>
            {event.participantCount} registered
          </span>
        </div>
      </div>

      <Link href={`/registration?eventId=${event.id}`}>
        <Button className="w-full" size="sm" data-testid={`button-register-event-${event.id}`}>
          Register for this Event
        </Button>
      </Link>
    </Card>
  );
}
