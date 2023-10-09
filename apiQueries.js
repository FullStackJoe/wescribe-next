export const getSubscriptionsByUserIdQuery =
  "SELECT * FROM subscriptions WHERE userId = $1;";
export const getCheaperMobileAlternativeQuery =
  "SELECT * FROM Subscriptions WHERE type = $1 AND priceMonth <= $2 AND datamonth >= $3 AND talktime >= $4 AND subscriptionId <> $5 AND available = TRUE ORDER BY priceMonth ASC, datamonth DESC LIMIT 3;";
export const createMobileSubscriptionQuery =
  "insert into Subscriptions(Provider, Type, Category, Name, PriceMonth, DataMonth, Talktime, UploadSpeed, DownloadSpeed, Userid, available) VALUES ($1, 'Mobile', 'Mobile', 'Placeholder', $2, $3, $4, NULL, NULL, $5, false) RETURNING *;";
export const deleteMobileSubscriptionQuery =
  "DELETE FROM Subscriptions WHERE subscriptionId = $1;";

export const getSubscription =
  "SELECT * FROM Subscriptions WHERE subscriptionId = $1;";
{
  /*
  export const getCheaperInternetAlternativeQuery =
    "SELECT * FROM Subscriptions WHERE type = $1 AND priceMonth <= $2 and uploadSpeed >= $3 and downloadSpeed>= $4 and subscriptionId <> $5;";

  export const getSubscriptionsQuery = "SELECT * FROM Subscriptions";

  */
}
