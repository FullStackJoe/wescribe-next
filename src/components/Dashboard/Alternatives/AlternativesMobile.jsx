import React from "react";
import SubscriptionCard from "../SubscriptionCard";
import NoCheaperSubs from "./NoCheaperSubs";

function AlternativesMobile({ AltSubscriptionData, SubscriptionData }) {
  return (
    <div className="flex flex-row justify-center">
      {SubscriptionData.length == 0 ? (
        <>
          <div className="flex flex-col items-center">
            <h2 className="font-bold">Dine nuværende abonementer</h2>
            {/*Print a subscription, if sub is of type mobile*/}
            <div className="flex flex-wrap justify-center">
              {SubscriptionData.map((item) =>
                item.type === "Mobile" ? (
                  <div className="px-6 py-5" key={item.subscriptionid}>
                    <SubscriptionCard
                      provider={item.provider}
                      talk={item.talktime === 9999 ? "FRI" : item.talktime}
                      data={item.datamonth === 9999 ? "FRI" : item.datamonth}
                      monthlyPrice={parseInt(item.pricemonth)}
                      editMode={""}
                      subscriptionId={item.subscriptionid}
                      onSubmitSuccess={""}
                    />
                  </div>
                ) : null
              )}
              {/*}
        <div className="flex flex-col mt-8 items-center">
          <p>Spar x kr pr md</p>
          <img
            className="w-9 h-10"
            src={arrow}
            alt="Right pointing arrow icon"
          />
        </div>
        */}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-bold">Forslag til nye abonementer</h2>

            <div className="flex flex-wrap justify-center">
              {AltSubscriptionData.map((item) =>
                item[0].type === "Mobile" ? (
                  <div className="px-6 py-5" key={item.subscriptionid}>
                    <SubscriptionCard
                      provider={item[0].provider}
                      talk={
                        item[0].talktime === 9999 ? "FRI" : item[0].talktime
                      }
                      data={
                        item[0].datamonth === 9999 ? "FRI" : item[0].datamonth
                      }
                      monthlyPrice={parseInt(item[0].pricemonth)}
                      editMode={""}
                      subscriptionId={item[0].subscriptionid}
                      onSubmitSuccess={""}
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="mt-5">
            <NoCheaperSubs />
          </p>
        </>
      )}
    </div>
  );
}

export default AlternativesMobile;
