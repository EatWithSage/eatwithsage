import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const db = drizzle(pool);
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("Migrations complete.");
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  runMigrations().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
}
