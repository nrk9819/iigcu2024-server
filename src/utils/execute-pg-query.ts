import { PoolClient, QueryResult } from "pg";
import { pool, closePool } from "./db-pool";

async function executePgQuery(query: string, params?: any[]): Promise<any[]> {
  const client: PoolClient = await pool.connect();

  try {
    const result: QueryResult = await client.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    await closePool();
    throw error;
  } finally {
    client.release();
  }
}

export default executePgQuery;
