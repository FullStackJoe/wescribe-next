import { pool } from "../../../db";
import { createOtherSubscriptionQuery } from "../../../apiQueries";

const createOtherSubscription = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not AllowedYOLO" });
  }

  const { name, priceMonth, userId } = req.body;

  try {
    const results = await pool.query(createOtherSubscriptionQuery, [
      name,
      priceMonth,
      userId,
    ]);
    // Assuming the inserted row is the first row in the result set
    const insertedRow = results.rows[0];
    res.status(201).json(insertedRow); // Send the inserted row back to the client
  } catch (error) {
    console.error("Error creating Other subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default createOtherSubscription;
