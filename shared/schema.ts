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
  participantCount: integer("participant_count").notNull().default(0),
  icon: text("icon"), // Lucide icon name
});

// Registrations table
export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  college: text("college").notNull(),
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
});

// Types
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
