import { pool } from "../../../../db";
import {
  getMobileByUserIdQuery,
  getInternetByUserIdQuery,
  getStreamingByUserIdQuery,
  getOtherByUserIdQuery,
} from "../../../../apiQueries";

const getSubscriptionsByUserId = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query; // The id parameter is now accessed from req.query

  try {
    const mobileSubscriptions = await pool.query(getMobileByUserIdQuery, [id]);
    const internetSubscriptions = await pool.query(getInternetByUserIdQuery, [
      id,
    ]);
    const streamingSubscriptions = await pool.query(getStreamingByUserIdQuery, [
      id,
    ]);
    const otherSubscriptions = await pool.query(getOtherByUserIdQuery, [id]);

    const subscriptions = {
      mobile: mobileSubscriptions.rows,
      internet: internetSubscriptions.rows,
      streaming: streamingSubscriptions.rows,
      other: otherSubscriptions.rows,
    };

    res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getSubscriptionsByUserId;
