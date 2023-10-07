// pages/api/deleteMobileSubscription.js
import { pool } from "../../../../db";
import { deleteMobileSubscriptionQuery } from "../../../../apiQueries";

const deleteMobileSubscription = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { subscriptionId } = req.query;

  try {
    console.log(subscriptionId);
    await pool.query(deleteMobileSubscriptionQuery, [subscriptionId]);
    res
      .status(200)
      .json({ message: "Mobile subscription deleted successfully" });
  } catch (error) {
    console.error("Error deleting mobile subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default deleteMobileSubscription;
