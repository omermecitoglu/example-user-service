import { createInsertSchema } from "drizzle-zod";
import { users } from "~/database/schema/users";

export const UserDTO = createInsertSchema(users, {
  id: schema => schema.id.describe("Unique identifier of the user"),
  name: schema => schema.name.describe("Display name of the user"),
  email: schema => schema.email.describe("Email address of the user"),
  password: schema => schema.password.describe("Encrypted password of the user"),
  createdAt: schema => schema.createdAt.describe("Creation date of the user"),
  updatedAt: schema => schema.updatedAt.describe("Modification date of the user"),
}).required().describe("Represents the data of a user in the system.");

export const NewUserDTO = UserDTO.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).describe("Represents the data required to create a new user.");

export const UserPatchDTO = NewUserDTO.omit({
  password: true,
}).partial().describe("Represents the data needed to update an existing user.");
