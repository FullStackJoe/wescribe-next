import Head from "next/head";
import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "@/firebase/AuthContext";
import Layout from "@/components/layout";
import HasNoSubs from "@/components/Alternatives/HasNoSubs";
import HasSubs from "@/components/Alternatives/HasSubs";
import Login from "./login";

export default function AlternativeSubscriptions() {
  const { currentUser, logout } = useAuth();
  const [AltSubscriptionData, setAltSubscriptionData] = useState([]);
  const [SubscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [altLoading, setAltLoading] = useState(true);

  // TODO
  // API should be changes to this call can be made much simpler withour sorting and concatination.
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setLoading(true);
    fetch("/api/subscriptions/" + currentUser.uid)
      .then((response) => response.json())
      .then((fetchedData) => {
        setSubscriptionData(fetchedData);
        return Promise.all(
          fetchedData.mobile.map((sub) =>
            fetch("/api/getAlternativeSub/" + sub.subscriptionid)
              .then((response) => response.json())
              .then((alternativeData) => {
                // Create a new array with the original subscription at index 0 and the alternatives at indices 1-3
                return [sub].concat(alternativeData);
              })
          )
        );
      })
      .then((groupedDataArray) => {
        // Sort the outer array based on the highest sixmonthsaving value
        const sortedAltSubscriptionData = groupedDataArray.sort((a, b) => {
          const highestSavingA = Math.max(
            ...a.slice(1).map((sub) => sub.sixmonthsaving)
          );
          const highestSavingB = Math.max(
            ...b.slice(1).map((sub) => sub.sixmonthsaving)
          );
          return highestSavingB - highestSavingA;
        });

        setAltSubscriptionData(sortedAltSubscriptionData);
        setLoading(false);
        setAltLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setAltLoading(false);
      });
  }, []);

  if (!currentUser) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>WeScribe - Abonnement scanner</title>
      </Head>
      <Layout>
        {/* Show loading animation while fetching*/}
        {loading || altLoading ? (
          <div className="flex justify-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#BD0060"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : // IF user has no subs show hasNoSubs component
        SubscriptionData.mobile.length == 0 ? (
          <HasNoSubs />
        ) : (
          // if user has subs show HasSubs component
          <HasSubs
            AltSubscriptionData={AltSubscriptionData}
            SubscriptionData={SubscriptionData}
          />
        )}
      </Layout>
    </>
  );
}
