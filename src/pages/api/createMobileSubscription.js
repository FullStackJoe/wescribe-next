import { pool } from "../../../db";
import { createMobileSubscriptionQuery } from "../../../apiQueries";

const createMobileSubscription = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { Provider, PriceMonth, DataMonth, Talktime, Userid } = req.body;

  try {
    const results = await pool.query(createMobileSubscriptionQuery, [
      Provider,
      PriceMonth,
      DataMonth,
      Talktime,
      Userid,
    ]);
    // Assuming the inserted row is the first row in the result set
    const insertedRow = results.rows[0];
    res.status(201).json(insertedRow); // Send the inserted row back to the client
  } catch (error) {
    console.error("Error creating mobile subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default createMobileSubscription;
