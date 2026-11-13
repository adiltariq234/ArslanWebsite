import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Booking / inquiry submissions coming from the website form.
 * Review them with:
 *   psql $DATABASE_URL -c "select * from inquiries order by created_at desc"
 */
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date"),
  location: text("location"),
  budget: text("budget"),
  message: text("message"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
