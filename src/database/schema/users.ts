import { relations, sql } from "drizzle-orm";
import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password", { length: 72 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, table => ({
  createdAtIdx: index().on(table.createdAt),
}));

export const relationsOfUsers = relations(users, ({ many, one }) => ({
}));
