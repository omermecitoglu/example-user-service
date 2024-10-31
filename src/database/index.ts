import getPackageMetadata from "@omer-x/package-metadata";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  user: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASS || "example",
  database: process.env.DATABASE_NAME || getPackageMetadata().moduleName,
});

const db = drizzle(pool, {
  schema,
  casing: "snake_case",
  logger: process.env.NODE_ENV === "development",
});

export default db;
