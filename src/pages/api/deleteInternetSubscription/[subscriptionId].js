import { pool } from "../../../../db";
import { deleteInternetSubscriptionQuery } from "../../../../apiQueries";

const deleteInternetSubscription = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { subscriptionId } = req.query;

  try {
    console.log(subscriptionId);
    await pool.query(deleteInternetSubscriptionQuery, [subscriptionId]);
    res
      .status(200)
      .json({ message: "Internet subscription deleted successfully" });
  } catch (error) {
    console.error("Error deleting internet subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default deleteInternetSubscription;
