import { eq } from "drizzle-orm";
import type database from "~/database";
import { users } from "~/database/schema/users";

export default async function deleteUser(db: typeof database, userId: string) {
  const results = await db.delete(users).where(eq(users.id, userId)).returning({
    id: users.id,
  });
  return results.shift();
}
