import React, { useState } from "react";
import SubscriptionCard from "../Dashboard/SubscriptionCard";
import NoCheaperSubs from "./NoCheaperSubs";

function AlternativesMobile({ AltSubscriptionData, SubscriptionData }) {
  const [currentSubscriptionIndices, setCurrentSubscriptionIndices] = useState(
    Array(AltSubscriptionData.length).fill(1) // Initial indices are 1 to show the first alternative subscription
  );
  const [isLoading, setIsLoading] = useState(true);

  const changeSubProposal = (arrayIndex) => {
    setCurrentSubscriptionIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[arrayIndex] =
        newIndices[arrayIndex] + 1 > 3 ? 1 : newIndices[arrayIndex] + 1; // Cycle back to 1 if the index goes beyond 3
      return newIndices;
    });
  };

  return (
    <div className="flex flex-row justify-center">
      {!SubscriptionData.length == 0 ? (
        <>
          <div className="flex flex-col items-center">
            <h2 className="font-bold">Dine nuværende abonementer</h2>
            {/*Print a subscription, if sub is of type mobile*/}
            <div className="flex flex-col items-center">
              {SubscriptionData.map((item) =>
                item.type === "Mobile" ? (
                  <div className="px-6 py-5 mb-8" key={item.subscriptionid}>
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

          <div className="flex flex-col flex-wrap items-center">
            <h2 className="font-bold mb-5">
              Forslag til billigere abonementer
            </h2>
            {AltSubscriptionData.map((subArray, arrayIndex) => (
              <div key={arrayIndex} className="flex flex-col items-center mb-5">
                {/* Show only one subscription based on currentSubscriptionIndices */}
                {subArray[currentSubscriptionIndices[arrayIndex]] && (
                  <SubscriptionCard
                    provider={
                      subArray[currentSubscriptionIndices[arrayIndex]].provider
                    }
                    talk={
                      subArray[currentSubscriptionIndices[arrayIndex]]
                        .talktime === 9999
                        ? "FRI"
                        : subArray[currentSubscriptionIndices[arrayIndex]]
                            .talktime
                    }
                    data={
                      subArray[currentSubscriptionIndices[arrayIndex]]
                        .datamonth === 9999
                        ? "FRI"
                        : subArray[currentSubscriptionIndices[arrayIndex]]
                            .datamonth
                    }
                    monthlyPrice={parseInt(
                      subArray[currentSubscriptionIndices[arrayIndex]]
                        .pricemonth
                    )}
                    editMode={""}
                    subscriptionId={
                      subArray[currentSubscriptionIndices[arrayIndex]]
                        .subscriptionid
                    }
                    onSubmitSuccess={""}
                  />
                )}
                <div className="mt-4">
                  <button
                    onClick={() => changeSubProposal(arrayIndex)}
                    className="bg-[#008B74] hover:bg-blue-600 text-sm text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    Vis nyt abonnement
                  </button>
                </div>
              </div>
            ))}
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
