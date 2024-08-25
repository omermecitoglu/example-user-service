import { createInsertSchema } from "drizzle-zod";
import { users } from "~/database/schema/users";
import type z from "zod";

const baseSchema = createInsertSchema(users, {
  id: schema => schema.id.readonly().describe("Unique identifier of the user"),
  name: schema => schema.name.describe("Display name of the user"),
  email: schema => schema.email.describe("Email address of the user"),
  password: schema => schema.password.describe("Encrypted password of the user"),
  createdAt: schema => schema.createdAt.readonly().describe("Creation date of the user as an ISO 8601 date string"),
  updatedAt: schema => schema.updatedAt.readonly().describe("Modification date of the user as an ISO 8601 date string"),
});

export const UserDTO = baseSchema.required()
  .describe("Represents a user definition");

export const NewUserDTO = baseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).describe("Data Transfer Object for creating a new user");

export const UserPatchDTO = NewUserDTO.partial().omit({
}).describe("Data Transfer Object for updating an existing user");

export function testUserData() {
  return {
    name: "unknown",
    email: "john.doe@example.com",
    password: "123",
    // add the required fields here
  } satisfies z.infer<typeof NewUserDTO>;
}
