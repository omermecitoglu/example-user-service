import "dotenv/config";
import getPackageMetadata from "@omer-x/package-metadata";
import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASS || "example",
    database: process.env.DATABASE_NAME || getPackageMetadata().moduleName,
  },
} satisfies Config;
