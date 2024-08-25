import type database from "~/database";

export default function getUser(db: typeof database, userId: string) {
  return db.query.users.findFirst({
    where: (table, { eq }) => eq(table.id, userId),
  });
}
