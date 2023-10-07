import React, { useState, useEffect } from "react";
import SubscriptionCard from "@/components/Dashboard/SubscriptionCard";
import { useAuth } from "@/firebase/AuthContext";
import Layout from "@/components/layout";

export default function AlternativeSubscriptions() {
  const { currentUser, logout } = useAuth();
  const [AltSubscriptionData, setAltSubscriptionData] = useState([]);
  const [SubscriptionData, setSubscriptionData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("/api/getAlternativeSubscriptionByUserId/" + currentUser.uid)
      .then((response) => response.json())
      .then((fetchedData) => {
        console.log(fetchedData); // Add this line
        setAltSubscriptionData(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/subscriptions/" + currentUser.uid)
      .then((response) => response.json())
      .then((fetchedData) => {
        console.log(fetchedData); // Add this line
        setSubscriptionData(fetchedData); // Corrected line
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Layout>
        <h1 className="text-3xl flex justify-center">
          {!Array.isArray(SubscriptionData)
            ? "Alternatives"
            : "You dont have any subscriptions yet :("}{" "}
        </h1>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col items-center">
            {AltSubscriptionData[0] ? <h2>Dine nuværende abonementer</h2> : ""}
            <div className="flex flex-wrap justify-center">
              {Array.isArray(SubscriptionData) &&
                SubscriptionData.map((item) =>
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
              {/* 
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
            {AltSubscriptionData[0] ? <h2>Forslag til nye abonementer</h2> : ""}
            <div className="flex flex-wrap justify-center">
              {Array.isArray(AltSubscriptionData) &&
                AltSubscriptionData.map((item) =>
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
        </div>
      </Layout>
    </>
  );
}
