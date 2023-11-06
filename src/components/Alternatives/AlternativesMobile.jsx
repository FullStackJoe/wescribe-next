import React, { useState } from "react";
import SubscriptionCard from "../Dashboard/SubscriptionCard";
import NoCheaperSubs from "./NoCheaperSubs";
import styles from "./AlternativesMobile.module.css";
import Savings from "./Savings";

function AlternativesMobile({ AltSubscriptionData, SubscriptionData }) {
  const [indices, setIndices] = useState({}); // Step 1: Initialize a state variable for indices

  const handleButtonClick = (subArrayIndex) => {
    setIndices((prevIndices) => {
      const currentIndex = prevIndices[subArrayIndex] || 1;
      const nextIndex =
        (currentIndex + 1) % AltSubscriptionData[subArrayIndex].length;
      return { ...prevIndices, [subArrayIndex]: nextIndex };
    });
  };

  if (SubscriptionData.length === 0) {
    return (
      <>
        <p className="mt-5">
          <NoCheaperSubs />
        </p>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col items-center w-auto">
          <div className="text-center" style={{ width: "365px" }}>
            <h2 className="font-bold text-2xl">Dine abonnementer</h2>
          </div>
        </div>
        <div className="flex flex-col items-center w-auto">
          <div className="text-center" style={{ width: "365px" }}>
            <h2 className="font-bold text-2xl">Besparrelse</h2>
          </div>
        </div>
      </div>
      {AltSubscriptionData.map((subArray, index) => (
        <div key={index}>
          <div className="flex flex-row m-6">
            <div className="mr-4">
              <SubscriptionCard
                provider={subArray[0].provider}
                talk={
                  subArray[0].talktime === 9999 ? "FRI" : subArray[0].talktime
                }
                data={
                  subArray[0].datamonth === 9999 ? "FRI" : subArray[0].datamonth
                }
                monthlyPrice={parseInt(subArray[0].pricemonth)}
                editMode={""}
                subscriptionId={subArray[0].subscriptionid}
                onSubmitSuccess={""}
              />
            </div>
            {subArray.length > 1 ? (
              <>
                <Savings
                  saving={subArray[indices[index] || 1].sixmonthsaving}
                />
                <div className="ml-6 alternative">
                  <a target="_blank" href={subArray[indices[index] || 1].link}>
                    <div className={styles.alternativeSub}>
                      <SubscriptionCard
                        provider={subArray[indices[index] || 1].provider} // Use the current index
                        talk={
                          subArray[indices[index] || 1].talktime === 9999
                            ? "FRI"
                            : subArray[indices[index] || 1].talktime
                        }
                        data={
                          subArray[indices[index] || 1].datamonth === 9999
                            ? "FRI"
                            : subArray[indices[index] || 1].datamonth
                        }
                        monthlyPrice={parseInt(
                          subArray[indices[index] || 1].pricemonth
                        )}
                        discountPrice={
                          subArray[indices[index] || 1].discountprice
                        }
                        discountMonths={
                          subArray[indices[index] || 1].discountmonths
                        }
                        editMode={""}
                        subscriptionId={
                          subArray[indices[index] || 0].subscriptionid
                        }
                        onSubmitSuccess={""}
                      />
                    </div>
                  </a>
                  {subArray.length > 2 ? (
                    <div className="flex justify-center">
                      <button onClick={() => handleButtonClick(index)}>
                        Se nyt forslag
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              <>
                <Savings />
                <div className="flex items-center text-center ml-6">
                  <p style={{ maxWidth: "365px" }}>
                    Vi fandt ingen billigere alternativer til dette abonnement
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlternativesMobile;
