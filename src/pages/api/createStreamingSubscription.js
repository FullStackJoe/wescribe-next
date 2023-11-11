import { pool } from "../../../db";
import { createStreamingSubscriptionQuery } from "../../../apiQueries";

const createStreamingSubscription = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not AllowedYOLO" });
  }

  const { provider, priceMonth, type, userid } = req.body;

  try {
    const results = await pool.query(createStreamingSubscriptionQuery, [
      provider,
      priceMonth,
      type,
      userid,
    ]);
    // Assuming the inserted row is the first row in the result set
    const insertedRow = results.rows[0];
    res.status(201).json(insertedRow); // Send the inserted row back to the client
  } catch (error) {
    console.error("Error creating streaming subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default createStreamingSubscription;
