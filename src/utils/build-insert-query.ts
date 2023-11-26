/**
 * Function to build dynamic insert qurery based on an object
 */
function buildInsertQuery(
  tableName: string,
  data: Record<string, any>
): { query: string; params: any[] } {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`);
  const query = `INSERT INTO ${tableName} (${columns.join(
    ", "
  )}) VALUES (${placeholders.join(", ")})`;

  return { query, params: values };
}

export default buildInsertQuery;
