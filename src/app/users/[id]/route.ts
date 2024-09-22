import defineRoute from "@omer-x/next-openapi-route-handler";
import { UserDTO, UserPatchDTO } from "~/models/user";
import type z from "zod";

export const { GET } = defineRoute({
  operationId: "getUser",
  method: "GET",
  summary: "Get user",
  description: "Get a specific user by ID",
  tags: ["Users"],
  pathParams: UserDTO.pick({ id: true }),
  action: async ({ pathParams }) => {
    return Response.json({
      id: "uuid",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "top-secret-password",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } satisfies z.infer<typeof UserDTO>);
    // return new Response(null, { status: 404 });
  },
  responses: {
    200: { description: "User found", content: UserDTO },
    404: { description: "User not found" },
  },
});

export const { PATCH } = defineRoute({
  operationId: "updateUser",
  method: "PATCH",
  summary: "Update user",
  description: "Update a specific user by ID",
  tags: ["Users"],
  pathParams: UserDTO.pick({ id: true }),
  requestBody: UserPatchDTO,
  action: async ({ pathParams, body }) => {
    return Response.json({
      id: "uuid",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "top-secret-password",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } satisfies z.infer<typeof UserDTO>);
    // return new Response(null, { status: 404 });
  },
  responses: {
    200: { description: "User updated successfully", content: UserDTO },
    404: { description: "User not found" },
  },
});

export const { DELETE } = defineRoute({
  operationId: "deleteUser",
  method: "DELETE",
  summary: "Delete user",
  description: "Delete a specific user by ID",
  tags: ["Users"],
  pathParams: UserDTO.pick({ id: true }),
  action: async ({ pathParams }) => {
    return new Response(null, { status: 204 });
    // return new Response(null, { status: 404 });
  },
  responses: {
    204: { description: "User deleted successfully" },
    404: { description: "User not found" },
  },
});
