// pages/api/createMobileSubscription.js
import { pool } from "../../db";
import { createMobileSubscriptionQuery } from "../../../apiQueries";

export default async (req, res) => {
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
    res
      .status(201)
      .json({ message: "Mobile subscription created successfully" });
  } catch (error) {
    console.error("Error creating mobile subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
