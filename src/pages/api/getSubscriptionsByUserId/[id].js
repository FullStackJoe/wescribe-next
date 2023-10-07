// pages/api/getSubscriptionByUserId/[id].js
import { pool } from "../../../../db";
import { getSubscriptionsByUserIdQuery } from "../../../queries";

const getSubscriptionsByUserId = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query; // The id parameter is now accessed from req.query

  try {
    const { rows } = await pool.query(getSubscriptionsByUserIdQuery, [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getSubscriptionsByUserId;
