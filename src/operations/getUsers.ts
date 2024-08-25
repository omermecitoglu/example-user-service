import selectColumns from "~/core/column";
import type database from "~/database";
import { UserDTO } from "~/models/user";
import type { z } from "zod";

const selectSchema = UserDTO.keyof().array().default([]);

export default function getUsers(db: typeof database, select: z.infer<typeof selectSchema>) {
  return db.query.users.findMany({
    columns: selectColumns(select),
    orderBy: (u, { asc }) => [asc(u.createdAt)],
  });
}
