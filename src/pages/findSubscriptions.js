import Head from "next/head";
import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import SubscriptionCard from "@/components/Dashboard/SubscriptionCard";
import { useAuth } from "@/firebase/AuthContext";
import Layout from "@/components/layout";
import HasNoSubs from "@/components/Dashboard/Alternatives/HasNoSubs";
import HasSubs from "@/components/Dashboard/Alternatives/HasSubs";
import Login from "./login";

export default function AlternativeSubscriptions() {
  const { currentUser, logout } = useAuth();
  const [AltSubscriptionData, setAltSubscriptionData] = useState([]);
  const [SubscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setLoading(true);
    // Fetch data when the component mounts
    fetch("/api/getAlternativeSubscriptionByUserId/" + currentUser.uid)
      .then((response) => response.json())
      .then((fetchedData) => {
        setAltSubscriptionData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/api/subscriptions/" + currentUser.uid)
      .then((response) => response.json())
      .then((fetchedData) => {
        setSubscriptionData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
        {loading ? (
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
        SubscriptionData.length == 0 ? (
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
