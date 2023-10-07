// db.js
import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wescribe",
  password: "91827a",
  port: "5432",
});
