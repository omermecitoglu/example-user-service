export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    process.title = "user-service";

    if (process.env.VERCEL !== "1") {
      const { default: migrate } = await import("./database/migrate");
      await migrate();
    }
  }
}
