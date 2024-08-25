import { eq } from "drizzle-orm";
import type database from "~/database";
import { users } from "~/database/schema/users";
import type { UserPatchDTO } from "~/models/user";
import type { z } from "zod";

export default async function updateUser(db: typeof database, userId: string, patch: z.infer<typeof UserPatchDTO>) {
  const results = await db.update(users)
    .set(patch)
    .where(eq(users.id, userId))
    .returning();
  return results.shift();
}
