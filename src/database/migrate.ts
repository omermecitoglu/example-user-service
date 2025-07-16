import getPackageMetadata from "@omer-x/package-metadata";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client, type ClientConfig } from "pg";

async function createDatabase(
  creds: Pick<ClientConfig, "host" | "port" | "user" | "password" | "database">,
  attempt = 1,
): Promise<void> {
  const creator = new Client({ ...creds, database: "postgres" });
  try {
    await creator.connect();
    try {
      await creator.query(`CREATE DATABASE "${creds.database}"`);
    } catch {
      // do nothing
    } finally {
      await creator.end();
    }
  } catch {
    await creator.end();
    await new Promise(resolve => setTimeout(resolve, 1000));
    // eslint-disable-next-line no-console
    console.log("\x1b[33m%s\x1b[0m", "Retrying to create database...");
    if (attempt > 500) {
      throw new Error("Failed to create database after multiple attempts");
    }
    await createDatabase(creds, attempt + 1);
  }
}

async function migrateAppDatabase() {
  const packageMetadata = getPackageMetadata();

  const dbCredentials = {
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "example",
    database: process.env.POSTGRES_DATABASE || packageMetadata.moduleName,
  };

  if (dbCredentials.database === "verceldb") return;
  await createDatabase(dbCredentials);

  const client = new Client(dbCredentials);
  await client.connect();
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "./drizzle" });
  await client.end();
}

export default migrateAppDatabase;
