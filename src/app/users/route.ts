import createRoute from "@omer-x/next-openapi-route-handler";
import db from "~/database";
import { users } from "~/database/schema/users";
import { NewUserDTO, UserDTO } from "~/models/user";

export const { GET } = createRoute({
  operationId: "getUsers",
  method: "GET",
  summary: "Get all users",
  description: "Retrieve a list of all registered users",
  tags: ["Users"],
  action: async () => {
    const results = await db.select().from(users);
    return Response.json(results);
  },
  responses: {
    200: { description: "A list of users", content: UserDTO, isArray: true },
  },
});

export const { POST } = createRoute({
  operationId: "createUser",
  method: "POST",
  summary: "Create a new user",
  description: "Add a new user to the system",
  tags: ["Users"],
  requestBody: NewUserDTO,
  action: async ({ body }) => {
    const [user] = await db.insert(users).values(body).returning();
    return Response.json(user, { status: 201 });
  },
  responses: {
    201: { description: "User successfully created", content: UserDTO },
    409: { description: "Email already exists" },
  },
});
