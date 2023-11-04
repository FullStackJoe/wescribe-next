import { pool } from "../../../db";
import { createBroadbandSubscriptionQuery } from "../../../apiQueries";

const createBroadbandSubscription = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not AllowedYOLO" });
  }

  const { Provider, PriceMonth, uploadSpeed, downloadSpeed, Userid } = req.body;

  try {
    const results = await pool.query(createBroadbandSubscriptionQuery, [
      Provider,
      PriceMonth,
      uploadSpeed,
      downloadSpeed,
      Userid,
    ]);
    // Assuming the inserted row is the first row in the result set
    const insertedRow = results.rows[0];
    res.status(201).json(insertedRow); // Send the inserted row back to the client
  } catch (error) {
    console.error("Error creating broadband subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default createBroadbandSubscription;
