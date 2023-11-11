// TODO
// Lav API om så der requestes på et brugerID og returneres alternativer til alle brugerens abonnementer,
// et alternativ skal også indeholde id på det originale abonnement

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
    if (rows.length > 0) {
      const originalPricePerMonth = rows[0].pricemonth;
      const alternativeSubs = await getAlternativeSub(rows[0]); // getting alternative for the first subscription

      // Here, we add the "6monthsaving" field to each object with dynamic calculation
      const enrichedSubs = alternativeSubs.map((sub) => {
        let saving;
        if (sub.discountmonths !== null && sub.discountprice !== null) {
          saving =
            originalPricePerMonth * 6 -
            sub.pricemonth * (6 - sub.discountmonths) -
            sub.discountmonths * sub.discountprice;
        } else {
          saving = originalPricePerMonth * 6 - sub.pricemonth * 6;
        }

        return {
          ...sub, // Spread operator to copy all existing fields
          sixmonthsaving: saving, // Add the new field with the calculated saving
        };
      });
      console.log(enrichedSubs);
      res.status(200).json(enrichedSubs);
    } else {
      res.status(404).json({ message: "No subscriptions found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAlternativeSubscriptionByUserId;
