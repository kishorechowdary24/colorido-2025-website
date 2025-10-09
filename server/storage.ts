import { type Event, type InsertEvent, type Registration, type InsertRegistration } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  incrementEventParticipants(eventIds: string[]): Promise<void>;
  
  getAllRegistrations(): Promise<Registration[]>;
  getRegistration(id: string): Promise<Registration | undefined>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
}

export class MemStorage implements IStorage {
  private events: Map<string, Event>;
  private registrations: Map<string, Registration>;

  constructor() {
    this.events = new Map();
    this.registrations = new Map();
    this.seedEvents();
  }

  private seedEvents() {
    const sampleEvents: InsertEvent[] = [
      {
        title: "Techno Fiesta",
        description: "Technical paper presentation and project exhibition showcasing innovative ideas",
        category: "Technical",
        department: "CSE",
        icon: "Laptop",
      },
      {
        title: "Brain Blast",
        description: "Technical quiz competition testing knowledge across various tech domains",
        category: "Technical",
        department: "ECE",
        icon: "Brain",
      },
      {
        title: "Innoverse",
        description: "Prototype building and innovation challenge for creative minds",
        category: "Technical",
        department: "CSE",
        icon: "Lightbulb",
      },
      {
        title: "Tech Quest",
        description: "Treasure hunt with technical puzzles and coding challenges",
        category: "Technical",
        department: "IT & MCA",
        icon: "Search",
      },
      {
        title: "ElectroVolts",
        description: "Circuit design and electronics project competition",
        category: "Technical",
        department: "EEE",
        icon: "Zap",
      },
      {
        title: "Code Sprint",
        description: "Competitive programming and algorithmic problem solving",
        category: "Technical",
        department: "CSE",
        icon: "Code",
      },
      {
        title: "Dance Fusion",
        description: "Solo and group dance performances across all genres",
        category: "Cultural",
        department: "ChE",
        icon: "Music",
      },
      {
        title: "Melodic Voices",
        description: "Solo and group singing competition in various categories",
        category: "Cultural",
        department: "Literary & Cultural",
        icon: "Mic",
      },
      {
        title: "Fashion Show",
        description: "Runway fashion show showcasing creative designs and themes",
        category: "Cultural",
        department: "Literary & Cultural",
        icon: "Sparkles",
      },
      {
        title: "Drama Fest",
        description: "Street play and drama competition on social themes",
        category: "Cultural",
        department: "Literary & Cultural",
        icon: "Theater",
      },
      {
        title: "Art Gallery",
        description: "Fine arts exhibition including painting, sketching, and digital art",
        category: "Cultural",
        department: "Literary & Cultural",
        icon: "Palette",
      },
      {
        title: "Battle of Bands",
        description: "Live band performance competition for music enthusiasts",
        category: "Cultural",
        department: "Literary & Cultural",
        icon: "Guitar",
      },
      {
        title: "Volleyball Tournament",
        description: "Inter-college volleyball championship with exciting matches",
        category: "Sports",
        department: "Sports",
        icon: "Circle",
      },
      {
        title: "Basketball Showdown",
        description: "3v3 and 5v5 basketball tournament for all skill levels",
        category: "Sports",
        department: "Sports",
        icon: "Trophy",
      },
      {
        title: "Cricket Fever",
        description: "Box cricket tournament with fast-paced exciting matches",
        category: "Sports",
        department: "Sports",
        icon: "Target",
      },
      {
        title: "Table Tennis",
        description: "Singles and doubles table tennis championship",
        category: "Sports",
        department: "Sports",
        icon: "Disc",
      },
      {
        title: "Chess Masters",
        description: "Strategic chess tournament for tactical thinkers",
        category: "Sports",
        department: "Sports",
        icon: "Crown",
      },
      {
        title: "Athletics Meet",
        description: "Track and field events including sprints, relays, and jumps",
        category: "Sports",
        department: "Sports",
        icon: "Flame",
      },
    ];

    sampleEvents.forEach((event) => {
      const id = randomUUID();
      this.events.set(id, {
        id,
        ...event,
        participantCount: Math.floor(Math.random() * 50),
      });
    });
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { id, ...insertEvent, participantCount: 0 };
    this.events.set(id, event);
    return event;
  }

  async incrementEventParticipants(eventIds: string[]): Promise<void> {
    for (const eventId of eventIds) {
      const event = this.events.get(eventId);
      if (event) {
        event.participantCount += 1;
        this.events.set(eventId, event);
      }
    }
  }

  async getAllRegistrations(): Promise<Registration[]> {
    return Array.from(this.registrations.values());
  }

  async getRegistration(id: string): Promise<Registration | undefined> {
    return this.registrations.get(id);
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const registration: Registration = { id, ...insertRegistration };
    this.registrations.set(id, registration);
    return registration;
  }
}

export const storage = new MemStorage();
