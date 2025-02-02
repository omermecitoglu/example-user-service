import getPackageMetadata from "@omer-x/package-metadata";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";

async function migrateAppDatabase() {
  const packageMetadata = getPackageMetadata();

  const dbCredentials = {
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "example",
    database: process.env.POSTGRES_DATABASE || packageMetadata.moduleName,
  };

  const connect = async () => {
    const creator = new Client({ ...dbCredentials, database: "postgres" });
    try {
      await creator.connect();
      try {
        await creator.query(`CREATE DATABASE "${dbCredentials.database}"`);
      } catch {
        // do nothing
      } finally {
        await creator.end();
      }
    } catch {
      await creator.end();
      await new Promise(resolve => setTimeout(resolve, 1000));
      await connect();
    }
  };
  if (dbCredentials.database === "verceldb") return;
  await connect();

  const client = new Client(dbCredentials);
  await client.connect();
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "./drizzle" });
  await client.end();
}

export default migrateAppDatabase;
