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
      // TECHNICAL EVENTS (15 events)
      {
        title: "Techno Fiesta",
        description: "Technical paper presentation and project exhibition showcasing innovative ideas and cutting-edge technology",
        category: "Technical",
        department: "CSE",
        date: "December 17, 2025",
        time: "10:00 AM - 1:00 PM",
        prize: "₹50,000",
        icon: "Laptop",
      },
      {
        title: "Brain Blast",
        description: "Ultimate technical quiz competition testing knowledge across computer science, electronics, and emerging technologies",
        category: "Technical",
        department: "ECE",
        date: "December 17, 2025",
        time: "2:00 PM - 4:00 PM",
        prize: "₹30,000",
        icon: "Brain",
      },
      {
        title: "Code Sprint",
        description: "Intense competitive programming marathon featuring algorithmic challenges and real-world problem solving",
        category: "Technical",
        department: "CSE",
        date: "December 17, 2025",
        time: "9:00 AM - 5:00 PM",
        prize: "₹75,000",
        icon: "Code",
      },
      {
        title: "Innoverse",
        description: "Innovation challenge for building working prototypes and presenting groundbreaking project ideas",
        category: "Technical",
        department: "CSE",
        date: "December 18, 2025",
        time: "10:00 AM - 3:00 PM",
        prize: "₹100,000",
        icon: "Lightbulb",
      },
      {
        title: "Tech Quest",
        description: "Technical treasure hunt combining coding challenges, hardware debugging, and puzzle solving across campus",
        category: "Technical",
        department: "IT & MCA",
        date: "December 17, 2025",
        time: "11:00 AM - 2:00 PM",
        prize: "₹25,000",
        icon: "Search",
      },
      {
        title: "ElectroVolts",
        description: "Electronics circuit design competition with focus on power systems and embedded applications",
        category: "Technical",
        department: "EEE",
        date: "December 17, 2025",
        time: "1:00 PM - 4:00 PM",
        prize: "₹40,000",
        icon: "Zap",
      },
      {
        title: "Robo Wars",
        description: "Battle of autonomous robots in an arena - design, build, and fight!",
        category: "Technical",
        department: "MECH",
        date: "December 18, 2025",
        time: "11:00 AM - 5:00 PM",
        prize: "₹60,000",
        icon: "Bot",
      },
      {
        title: "Web Wizardry",
        description: "24-hour web development hackathon to create innovative web applications",
        category: "Technical",
        department: "CSE",
        date: "December 17-18, 2025",
        time: "6:00 PM - 6:00 PM",
        prize: "₹50,000",
        icon: "Globe",
      },
      {
        title: "AI Challenge",
        description: "Machine learning and AI model development competition with real-world datasets",
        category: "Technical",
        department: "CSE",
        date: "December 18, 2025",
        time: "9:00 AM - 4:00 PM",
        prize: "₹80,000",
        icon: "Cpu",
      },
      {
        title: "Poota Preso",
        description: "Technical poster presentation showcasing research and innovative project concepts",
        category: "Technical",
        department: "EEE",
        date: "December 17, 2025",
        time: "10:00 AM - 2:00 PM",
        prize: "₹20,000",
        icon: "FileText",
      },
      {
        title: "Circuit IQ",
        description: "Circuit debugging and analysis competition testing electronics fundamentals",
        category: "Technical",
        department: "ECE",
        date: "December 17, 2025",
        time: "3:00 PM - 5:00 PM",
        prize: "₹25,000",
        icon: "CircuitBoard",
      },
      {
        title: "CAD Master",
        description: "Computer-aided design competition for mechanical and civil engineering students",
        category: "Technical",
        department: "MECH & CIVIL",
        date: "December 18, 2025",
        time: "10:00 AM - 1:00 PM",
        prize: "₹30,000",
        icon: "Ruler",
      },
      {
        title: "Cyber Security CTF",
        description: "Capture the flag cybersecurity competition with hacking challenges",
        category: "Technical",
        department: "CSE",
        date: "December 18, 2025",
        time: "2:00 PM - 6:00 PM",
        prize: "₹45,000",
        icon: "Shield",
      },
      {
        title: "IoT Innovation",
        description: "Internet of Things project showcase and competition for smart solutions",
        category: "Technical",
        department: "ECE",
        date: "December 18, 2025",
        time: "11:00 AM - 3:00 PM",
        prize: "₹35,000",
        icon: "Wifi",
      },
      {
        title: "Data Science Derby",
        description: "Data analysis and visualization competition with complex datasets",
        category: "Technical",
        department: "CSE & IT",
        date: "December 17, 2025",
        time: "1:00 PM - 5:00 PM",
        prize: "₹40,000",
        icon: "BarChart",
      },

      // CULTURAL EVENTS (15 events)
      {
        title: "Dance Fusion",
        description: "Electrifying solo and group dance performances across classical, contemporary, and fusion genres",
        category: "Cultural",
        department: "ChE",
        date: "December 17, 2025",
        time: "5:00 PM - 8:00 PM",
        prize: "₹40,000",
        icon: "Music",
      },
      {
        title: "Melodic Voices",
        description: "Vocal competition featuring solo and group singing in Indian classical, western, and film music",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 17, 2025",
        time: "4:00 PM - 7:00 PM",
        prize: "₹35,000",
        icon: "Mic",
      },
      {
        title: "Fashion Fiesta",
        description: "Runway fashion show with creative themes, designer wear, and sustainable fashion showcase",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 18, 2025",
        time: "6:00 PM - 9:00 PM",
        prize: "₹50,000",
        icon: "Sparkles",
      },
      {
        title: "Street Play",
        description: "Powerful street drama performances on social awareness and contemporary themes",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 17, 2025",
        time: "3:00 PM - 6:00 PM",
        prize: "₹30,000",
        icon: "Theater",
      },
      {
        title: "Art Odyssey",
        description: "Fine arts exhibition featuring painting, sketching, digital art, and sculpture",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 17-18, 2025",
        time: "All Day",
        prize: "₹25,000",
        icon: "Palette",
      },
      {
        title: "Battle of Bands",
        description: "Live band performance battle with original compositions and cover songs",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 18, 2025",
        time: "7:00 PM - 10:00 PM",
        prize: "₹60,000",
        icon: "Guitar",
      },
      {
        title: "Stand-Up Comedy",
        description: "Open mic comedy night for aspiring comedians to showcase their talent",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 17, 2025",
        time: "8:00 PM - 10:00 PM",
        prize: "₹20,000",
        icon: "Laugh",
      },
      {
        title: "Short Film Festival",
        description: "Screening and competition for student-made short films and documentaries",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 18, 2025",
        time: "2:00 PM - 5:00 PM",
        prize: "₹45,000",
        icon: "Film",
      },
      {
        title: "Photography Contest",
        description: "Themed photography competition capturing moments, nature, and creative concepts",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 17-18, 2025",
        time: "All Day",
        prize: "₹15,000",
        icon: "Camera",
      },
      {
        title: "Poetry Slam",
        description: "Spoken word poetry competition in English, Hindi, and Telugu",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 17, 2025",
        time: "2:00 PM - 4:00 PM",
        prize: "₹10,000",
        icon: "BookOpen",
      },
      {
        title: "Classical Dance",
        description: "Traditional Indian classical dance forms - Bharatanatyam, Kuchipudi, Kathak showcase",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 18, 2025",
        time: "4:00 PM - 6:00 PM",
        prize: "₹30,000",
        icon: "Wind",
      },
      {
        title: "DJ Night",
        description: "Electronic music production and live DJ performance battle",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 18, 2025",
        time: "9:00 PM - 12:00 AM",
        prize: "₹35,000",
        icon: "Disc3",
      },
      {
        title: "Debate Competition",
        description: "Parliamentary debate on contemporary issues and global topics",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 17, 2025",
        time: "10:00 AM - 1:00 PM",
        prize: "₹15,000",
        icon: "MessageSquare",
      },
      {
        title: "Rangoli & Mehendi",
        description: "Traditional art forms competition - rangoli designs and mehendi patterns",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 17, 2025",
        time: "9:00 AM - 12:00 PM",
        prize: "₹10,000",
        icon: "Flower",
      },
      {
        title: "Mime Act",
        description: "Silent storytelling through expressive mime and body language performances",
        category: "Cultural",
        department: "Literary & Cultural",
        date: "December 18, 2025",
        time: "3:00 PM - 5:00 PM",
        prize: "₹12,000",
        icon: "Drama",
      },

      // SPORTS EVENTS (10 events)
      {
        title: "Cricket Tournament",
        description: "Box cricket championship with fast-paced exciting matches and playoffs",
        category: "Sports",
        department: "Sports",
        date: "December 17-18, 2025",
        time: "8:00 AM - 6:00 PM",
        prize: "₹40,000",
        icon: "Target",
      },
      {
        title: "Football League",
        description: "5-a-side football tournament with league format and knockout rounds",
        category: "Sports",
        department: "Sports",
        date: "December 17-18, 2025",
        time: "7:00 AM - 5:00 PM",
        prize: "₹35,000",
        icon: "CircleDot",
      },
      {
        title: "Volleyball Championship",
        description: "Inter-college volleyball tournament with competitive team matches",
        category: "Sports",
        department: "Sports",
        date: "December 17-18, 2025",
        time: "9:00 AM - 4:00 PM",
        prize: "₹30,000",
        icon: "Circle",
      },
      {
        title: "Basketball Slam",
        description: "3-on-3 basketball tournament with exciting street-style gameplay",
        category: "Sports",
        department: "Sports",
        date: "December 17-18, 2025",
        time: "8:00 AM - 5:00 PM",
        prize: "₹35,000",
        icon: "Trophy",
      },
      {
        title: "Badminton Open",
        description: "Singles and doubles badminton championship for all skill levels",
        category: "Sports",
        department: "Sports",
        date: "December 17-18, 2025",
        time: "7:00 AM - 2:00 PM",
        prize: "₹25,000",
        icon: "Wind",
      },
      {
        title: "Table Tennis Pro",
        description: "Fast-paced table tennis singles and doubles tournament",
        category: "Sports",
        department: "Sports",
        date: "December 17-18, 2025",
        time: "9:00 AM - 4:00 PM",
        prize: "₹20,000",
        icon: "Disc",
      },
      {
        title: "Chess Championship",
        description: "Strategic chess tournament with classical time control",
        category: "Sports",
        department: "Sports",
        date: "December 17-18, 2025",
        time: "10:00 AM - 6:00 PM",
        prize: "₹15,000",
        icon: "Crown",
      },
      {
        title: "Athletics Meet",
        description: "Track and field events - 100m, 200m, relay races, long jump, shot put",
        category: "Sports",
        department: "Sports",
        date: "December 17, 2025",
        time: "6:00 AM - 12:00 PM",
        prize: "₹30,000",
        icon: "Flame",
      },
      {
        title: "Carrom Tournament",
        description: "Singles and doubles carrom board championship",
        category: "Sports",
        department: "Sports",
        date: "December 17-18, 2025",
        time: "10:00 AM - 5:00 PM",
        prize: "₹10,000",
        icon: "Square",
      },
      {
        title: "Tug of War",
        description: "Traditional strength competition with team battles",
        category: "Sports",
        department: "Sports",
        date: "December 18, 2025",
        time: "11:00 AM - 2:00 PM",
        prize: "₹15,000",
        icon: "Anchor",
      },
    ];

    sampleEvents.forEach((event) => {
      const id = randomUUID();
      this.events.set(id, {
        id,
        ...event,
        department: event.department ?? null,
        icon: event.icon ?? null,
        participantCount: Math.floor(Math.random() * 80) + 10,
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
    const event: Event = { 
      id, 
      ...insertEvent, 
      department: insertEvent.department ?? null,
      icon: insertEvent.icon ?? null,
      participantCount: 0 
    };
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
    const registration: Registration = { 
      id, 
      ...insertRegistration,
      groupLeaderName: insertRegistration.groupLeaderName ?? null,
      groupLeaderEmail: insertRegistration.groupLeaderEmail ?? null,
      groupLeaderPhone: insertRegistration.groupLeaderPhone ?? null,
      groupLeaderCollege: insertRegistration.groupLeaderCollege ?? null,
      groupMembers: insertRegistration.groupMembers ?? null,
    };
    this.registrations.set(id, registration);
    return registration;
  }
}

export const storage = new MemStorage();
