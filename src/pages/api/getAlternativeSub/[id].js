import { pool } from "../../../../db";
import {
  getCheaperMobileAlternativeQuery,
  getCheaperInternetAlternativeQuery,
  getSubscription,
} from "../../../../apiQueries";

const getAlternativeSub = async (sub) => {
  const {
    type,
    category,
    pricemonth,
    datamonth,
    talktime,
    uploadspeed,
    downloadspeed,
    subscriptionid,
  } = sub;

  let query = "";
  let variables = [];

  if (category === "mobile") {
    query = getCheaperMobileAlternativeQuery;
    variables = [pricemonth, datamonth, talktime, subscriptionid];
    console.log("im here");
  } else if (category === "broadband") {
    query = getCheaperInternetAlternativeQuery;
    variables = [pricemonth, uploadspeed, downloadspeed, subscriptionid];
  }

  try {
    const { rows } = await pool.query(query, variables);
    return rows; // Assuming rows is an array of alternatives
  } catch (error) {
    console.error(error);
    return null; // or handle error as needed
  }
};

const getAlternativeSubscriptionByUserId = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  try {
    const { rows } = await pool.query(getSubscription, [id]);
    console.log(rows);
    if (rows.length > 0) {
      const alternativeSub = await getAlternativeSub(rows[0]); // getting alternative for the first subscription
      res.status(200).json(alternativeSub);
    } else {
      res.status(404).json({ message: "No subscriptions found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAlternativeSubscriptionByUserId;
