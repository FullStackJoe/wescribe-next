import React, { useState, useEffect } from "react";
import SubscriptionCard from "@/components/Dashboard/SubscriptionCardMobile";
import AlternativesMobile from "./AlternativesMobile";

function HasSubs({ AltSubscriptionData, SubscriptionData }) {
  let totalMaxSavings = 0;

  AltSubscriptionData.forEach((subArray) => {
    // Exclude the first object
    const filteredSubArray = subArray.slice(1);

    // Find the object with the highest sixmonthsaving value
    const highestSaving = filteredSubArray.reduce((highest, sub) => {
      // Check if sixmonthsaving exists and is greater than the current highest value
      if (
        sub.sixmonthsaving != null &&
        (highest === null || sub.sixmonthsaving > highest)
      ) {
        return sub.sixmonthsaving;
      }
      return highest;
    }, null);

    // Add the highest value to the total sum, if it's not null
    if (highestSaving !== null) {
      totalMaxSavings += highestSaving;
    }
  });
  return (
    <>
      {totalMaxSavings > 0 ? (
        <div className="text-center text-2xl font-bold bg-blue-100 py-2 rounded-md shadow mb-4">
          Spar <span style={{ color: "#BD0060" }}>{totalMaxSavings},-</span> på
          dine mobil abonnementer
          <span className="block text-sm font-normal">
            Vælg vores billigste forslag og spar {totalMaxSavings},- de næste 6
            mdr
          </span>
        </div>
      ) : (
        ""
      )}
      <AlternativesMobile AltSubscriptionData={AltSubscriptionData} />
      <h1 className="text-center text-3xl">Bredbånd</h1>
      <p className="text-center">KOMMER SNART</p>
    </>
  );
}

export default HasSubs;
