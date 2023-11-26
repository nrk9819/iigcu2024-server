import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
});

pool.on("error", (err) => {
  console.error("Error connecting to database:", err);
  process.exit(1); // Exit the process with an error code
});

// Function to gracefully shut down the pool
async function closePool(): Promise<void> {
  await pool.end();
}

export { pool, closePool };
