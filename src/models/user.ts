import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "~/database/schema/users";

const baseSchema = createInsertSchema(users, {
  id: schema => schema.readonly().describe("Unique identifier of the user"),
  name: schema => schema.describe("Display name of the user"),
  email: schema => schema.describe("Email address of the user"),
  password: schema => schema.describe("Encrypted password of the user"),
  createdAt: schema => z.iso.datetime().readonly().describe("Creation date of the user as an ISO 8601 date string"),
  updatedAt: schema => z.iso.datetime().readonly().describe("Modification date of the user as an ISO 8601 date string"),
});

export const UserDTO = baseSchema.required()
  .describe("Represents a user definition");

export type TypeOfUserDTO = z.infer<typeof UserDTO>;

export const NewUserDTO = baseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).describe("Data Transfer Object for creating a new user");

export type TypeOfNewUserDTO = z.infer<typeof NewUserDTO>;

export const UserPatchDTO = NewUserDTO.partial().omit({
}).describe("Data Transfer Object for updating an existing user");

export type TypeOfUserPatchDTO = z.infer<typeof UserPatchDTO>;
