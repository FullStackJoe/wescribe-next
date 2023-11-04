// Get queries
export const getSubscription = // Get data on a single subsription
  "SELECT *, 'mobile' AS category FROM mobilesubscription WHERE subscriptionId = $1;";
export const getSubscriptionsByUserIdQuery = // Get all subscriptions assigned a specific user
  "SELECT subscriptionid, provider, pricemonth, userid, available, link, datamonth, talktime, NULL AS uploadspeed, NULL AS downloadspeed, NULL AS type, 'mobile' as category FROM mobilesubscription WHERE userid = $1 UNION ALL SELECT subscriptionid, provider, pricemonth, userid, available, link, NULL AS datamonth, NULL AS talktime, uploadspeed, downloadspeed, NULL AS type, 'broadband' as category FROM broadbandsubscription WHERE userid = $1 UNION ALL SELECT subscriptionid, provider, pricemonth, userid, available, link, NULL AS datamonth, NULL AS talktime, NULL AS uploadspeed, NULL AS downloadspeed, type, 'streaming' as category FROM streamingsubscription WHERE userid = $1;";
export const getCheaperMobileAlternativeQuery = // Get 3 alternative mobile subs with lower/equal price, more/equal data, more/queal talktime, which are available. sorted by price
  "SELECT * FROM mobilesubscription WHERE priceMonth <= $1 AND datamonth >= $2 AND talktime >= $3 AND subscriptionId <> $4 AND available = TRUE ORDER BY priceMonth ASC, datamonth DESC LIMIT 3;";
// Create queries
export const addUserQuery = // Add a user to Users table, returning the created user.
  "INSERT INTO users(userID) VALUES ($1) RETURNING *;";
export const createBroadbandSubscriptionQuery = // Create broadband sub from provider, priceMonth, uploadSpeed, downloadSpeed, userId, returns the created sub
  "insert into Subscriptions(Provider, Type, Name, PriceMonth, DataMonth, Talktime, UploadSpeed, DownloadSpeed, Userid, available) VALUES ($1, 'Broadband', 'Placeholder', $2, NULL, NULL, $3, $4, $5, false) RETURNING *;";
export const createMobileSubscriptionQuery =
  "insert into mobilesubscription(Provider, PriceMonth, DataMonth, Talktime, Userid, available) VALUES ($1, $2, $3, $4, $5, false) RETURNING *;";
// Delte queries
export const deleteMobileSubscriptionQuery =
  "DELETE FROM mobilesubscription WHERE subscriptionId = $1;";

{
  /*
  export const getCheaperInternetAlternativeQuery =
    "SELECT * FROM Subscriptions WHERE type = $1 AND priceMonth <= $2 and uploadSpeed >= $3 and downloadSpeed>= $4 and subscriptionId <> $5;";

  export const getSubscriptionsQuery = "SELECT * FROM Subscriptions";

  */
}
