import z from "zod";

const baseSchema = z.object({
  id: z.string().uuid().readonly()
    .describe("Unique identifier of the user"),
  name: z.string().describe("Display name of the user"),
  email: z.string().email().describe("Email address of the user"),
  password: z.string().describe("Encrypted password of the user"),
  createdAt: z.string().readonly().describe("Creation date of the user as an ISO 8601 date string"),
  updatedAt: z.string().readonly().describe("Modification date of the user as an ISO 8601 date string"),
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
