import { relations, sql } from "drizzle-orm";
import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  password: varchar({ length: 72 }).notNull(),
  createdAt: timestamp({ withTimezone: true, precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp({ withTimezone: true, precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, table => ({
  createdAtIdx: index().on(table.createdAt),
}));

export const relationsOfUsers = relations(users, ({ many, one }) => ({
}));
