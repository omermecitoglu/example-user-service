import defineRoute from "@omer-x/next-openapi-route-handler";
import db from "~/database";
import { UserDTO, UserPatchDTO } from "~/models/user";
import deleteUser from "~/operations/deleteUser";
import getUser from "~/operations/getUser";
import updateUser from "~/operations/updateUser";

export const { GET } = defineRoute({
  operationId: "getUser",
  method: "GET",
  summary: "Get user",
  description: "Get a specific user by ID",
  tags: ["Users"],
  pathParams: UserDTO.pick({ id: true }),
  action: async ({ pathParams }) => {
    const user = await getUser(db, pathParams.id);
    if (user) {
      return Response.json(user);
    }
    return new Response(null, { status: 404 });
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
    const user = await updateUser(db, pathParams.id, body);
    if (user?.id === pathParams.id) {
      return Response.json(user);
    }
    return new Response(null, { status: 404 });
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
    const user = await deleteUser(db, pathParams.id);
    if (user?.id === pathParams.id) {
      return new Response(null, { status: 204 });
    }
    return new Response(null, { status: 404 });
  },
  responses: {
    204: { description: "User deleted successfully" },
    404: { description: "User not found" },
  },
});
