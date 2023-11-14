// pages/api/deleteMobileSubscription.js
import { pool } from "../../../../db";
import { deleteStreamingSubscriptionQuery } from "../../../../apiQueries";

const deleteStreamingSubscription = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { subscriptionId } = req.query;

  try {
    console.log(subscriptionId);
    await pool.query(deleteStreamingSubscriptionQuery, [subscriptionId]);
    res
      .status(200)
      .json({ message: "Streaming subscription deleted successfully" });
  } catch (error) {
    console.error("Error deleting Streaming subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default deleteStreamingSubscription;
