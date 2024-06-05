import createRoute from "@omer-x/next-openapi-route-handler";
import { eq } from "drizzle-orm";
import z from "zod";
import db from "~/database";
import { users } from "~/database/schema";
import { UserDTO, UserPatchDTO } from "~/models/user";

export const { GET } = createRoute({
  operationId: "getUser",
  method: "GET",
  summary: "Get a specific user by ID",
  description: "Retrieve details of a specific user by their ID",
  tags: ["Users"],
  pathParams: z.object({
    id: z.string().describe("ID of the user"),
  }),
  action: async ({ pathParams }) => {
    const results = await db.select().from(users).where(eq(users.id, pathParams.id));
    const user = results.shift();
    if (!user) return new Response(null, { status: 404 });
    return Response.json(user);
  },
  responses: {
    200: { description: "User details retrieved successfully", content: UserDTO },
    404: { description: "User not found" },
  },
});

export const { PATCH } = createRoute({
  operationId: "updateUser",
  method: "PATCH",
  summary: "Update a specific user by ID",
  description: "Modify details of a specific user by their ID",
  tags: ["Users"],
  pathParams: z.object({
    id: z.string().describe("ID of the user"),
  }),
  requestBody: UserPatchDTO,
  action: async ({ pathParams, body }) => {
    const results = await db.update(users)
      .set(body)
      .where(eq(users.id, pathParams.id))
      .returning();
    const user = results.shift();
    if (!user || user.id !== pathParams.id) {
      return new Response(null, { status: 404 });
    }
    return Response.json(user);
  },
  responses: {
    200: { description: "User updated successfully", content: UserDTO },
    404: { description: "User not found" },
    409: { description: "Email already exists" },
  },
});

export const { DELETE } = createRoute({
  operationId: "deleteUser",
  method: "DELETE",
  summary: "Delete a specific user by ID",
  description: "Remove a specific user from the system by their ID",
  tags: ["Users"],
  pathParams: z.object({
    id: z.string().describe("ID of the user"),
  }),
  action: async ({ pathParams }) => {
    const results = await db.delete(users).where(eq(users.id, pathParams.id)).returning({
      id: users.id,
    });
    const user = results.shift();
    if (!user || user.id !== pathParams.id) {
      return new Response(null, { status: 404 });
    }
    return new Response(null, { status: 204 });
  },
  responses: {
    204: { description: "User deleted successfully" },
    404: { description: "User not found" },
  },
});
