export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Client } = await import("pg");
    const path = await import("path");
    const fs = await import("fs");

    const getServiceName = () => {
      try {
        const filePath = path.resolve(process.cwd(), "package.json");
        const content = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(content);
        const packageName = data.name as string;
        const appName = packageName.split("/").pop();
        if (!appName) throw new Error(`Invalid package name (${packageName})`);
        return appName;
      } catch (error) {
        return "unknown-service";
      }
    };

    const dbCredentials = {
      host: process.env.DATABASE_HOST || "localhost",
      port: parseInt(process.env.DATABASE_PORT || "5432"),
      user: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASS || "example",
      database: process.env.DATABASE_NAME || getServiceName(),
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
      } catch (error) {
        await creator.end();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await connect();
      }
    };
    await connect();

    const client = new Client(dbCredentials);
    await client.connect();
    await client.end();
  }
}
