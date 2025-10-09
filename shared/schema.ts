import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Events table
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Technical, Cultural, Sports
  department: text("department"), // CSE, ECE, EEE, CE, MBA, etc.
  date: text("date").notNull(), // e.g., "December 17, 2025"
  time: text("time").notNull(), // e.g., "10:00 AM - 12:00 PM"
  prize: text("prize").notNull(), // e.g., "₹50,000"
  participantCount: integer("participant_count").notNull().default(0),
  icon: text("icon"), // Lucide icon name
});

// Registrations table
export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  registrationType: text("registration_type").notNull(), // "solo" or "group"
  
  // Solo registration fields
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  college: text("college").notNull(),
  
  // Group registration fields
  groupLeaderName: text("group_leader_name"),
  groupLeaderEmail: text("group_leader_email"),
  groupLeaderPhone: text("group_leader_phone"),
  groupLeaderCollege: text("group_leader_college"),
  groupMembers: text("group_members"), // JSON string of array of {name, rollNumber}
  
  eventIds: text("event_ids").array().notNull(), // Array of event IDs
  accommodation: text("accommodation").notNull(), // Yes/No
  transportation: text("transportation").notNull(), // Yes/No
});

// Insert schemas
export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  participantCount: true,
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
}).extend({
  registrationType: z.enum(["solo", "group"]),
});

// Types
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;

// Group member type
export type GroupMember = {
  name: string;
  rollNumber: string;
};
