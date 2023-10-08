import React, { useState, useEffect } from "react";
import SubscriptionCard from "@/components/Dashboard/SubscriptionCard";
import AlternativesMobile from "./AlternativesMobile";

function HasSubs({ AltSubscriptionData, SubscriptionData }) {
  console.log(AltSubscriptionData);
  return (
    <>
      <h1 className="text-center text-3xl">Mobil</h1>
      <AlternativesMobile
        AltSubscriptionData={AltSubscriptionData}
        SubscriptionData={SubscriptionData}
      />
    </>
  );
}

export default HasSubs;
