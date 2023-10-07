import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wescribe",
  password: "91827a",
  port: "5432",
});

// import pg from "pg";

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });

// export default pool;
