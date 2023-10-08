// THIS ENDPOINT IS NOT IN USE!

// pages/api/getAlternativeSubscriptionByUserId.js
import { pool } from "../../../../db";
import {
  getSubscriptionsByUserIdQuery,
  getCheaperMobileAlternativeQuery,
  getCheaperInternetAlternativeQuery,
} from "../../../../apiQueries";

const getListOfAlternativeSubs = async (subs) => {
  const subList = [];

  await Promise.all(
    subs.map(async (sub) => {
      const {
        type,
        pricemonth,
        datamonth,
        talktime,
        uploadspeed,
        downloadspeed,
        subscriptionid,
      } = sub;

      let query = "";
      let variables = [];

      if (type === "Mobile") {
        query = getCheaperMobileAlternativeQuery;
        variables = [type, pricemonth, datamonth, talktime, subscriptionid];
      } else if (type === "Internet") {
        query = getCheaperInternetAlternativeQuery;
        variables = [
          type,
          pricemonth,
          uploadspeed,
          downloadspeed,
          subscriptionid,
        ];
      }

      try {
        const { rows } = await pool.query(query, variables);
        subList.push(rows);
      } catch (error) {
        console.error(error);
      }
    })
  );

  return subList;
};

const getAlternativeSubscriptionByUserId = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  try {
    const { rows } = await pool.query(getSubscriptionsByUserIdQuery, [id]);
    const alternativeSubs = await getListOfAlternativeSubs(rows);
    res.status(200).json(alternativeSubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAlternativeSubscriptionByUserId;
