import { pool } from "../../../../db";
import { addUserQuery } from "../../../../apiQueries";

const createMobileSubscription = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  try {
    const results = await pool.query(addUserQuery, [id]);
    return res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error creating mobile subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default createMobileSubscription;
