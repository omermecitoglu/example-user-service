import type database from "~/database";
import { users } from "~/database/schema/users";
import type { NewUserDTO } from "~/models/user";
import type z from "zod";

export default async function createUser(db: typeof database, data: z.infer<typeof NewUserDTO>) {
  const [user] = await db.insert(users).values(data).returning({ id: users.id });
  return user;
}
