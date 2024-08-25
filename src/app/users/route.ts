import defineRoute from "@omer-x/next-openapi-route-handler";
import z from "zod";
import db from "~/database";
import { NewUserDTO, UserDTO } from "~/models/user";
import createUser from "~/operations/createUser";
import getUsers from "~/operations/getUsers";

export const { GET } = defineRoute({
  operationId: "getUsers",
  method: "GET",
  summary: "Get all users",
  description: "Retrieve a list of users",
  tags: ["Users"],
  queryParams: z.object({
    select: UserDTO.keyof().array().default([])
      .describe("List of the column names"),
  }),
  action: async ({ queryParams }) => {
    return Response.json(await getUsers(db, queryParams.select));
  },
  responses: {
    200: { description: "Returns a list of users", content: UserDTO, isArray: true },
  },
});

export const { POST } = defineRoute({
  operationId: "createUser",
  method: "POST",
  summary: "Create user",
  description: "Create a new user",
  tags: ["Users"],
  requestBody: NewUserDTO,
  action: async ({ body }) => {
    const user = await createUser(db, body);
    return Response.json(user, { status: 201 });
  },
  responses: {
    201: { description: "User created successfully", content: UserDTO },
    409: { description: "Email already exists" },
  },
});
