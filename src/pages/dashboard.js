import Login from "./login";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import SubscriptionCard from "@/components/Dashboard/SubscriptionCard";
import OverviewCard from "@/components/Dashboard/OverviewCard";
import CreateModal from "@/components/Dashboard/CreateModal";
import { useAuth } from "@/firebase/AuthContext";
import Layout from "@/components/layout";
import { ThreeDots } from "react-loader-spinner";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [SubscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const addSubscriptionOptimistically = (newSubscription) => {
    setSubscriptionData((prevSubscriptionData) => [
      ...prevSubscriptionData,
      newSubscription,
    ]);
  };

  const onSubmitSuccess = (responseData, subTempId) => {
    console.log(responseData);
    setSubscriptionData((prevSubscriptionData) =>
      prevSubscriptionData.map((subscription) =>
        subscription.subscriptionid === subTempId
          ? { ...subscription, subscriptionid: responseData.subscriptionid }
          : subscription
      )
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setLoading(true);
    // Fetch data when the component mounts
    fetch("/api/subscriptions/" + currentUser.uid)
      .then((response) => response.json())
      .then((fetchedData) => {
        setSubscriptionData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>WeScribe - Dit overblik</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center ">
          <h1 className="text-xl md:text-3xl p-2">Overblik over dit forbrug</h1>
          <span className="border-b-2 border-white h-1 w-10/12 md:w-8/12"></span>
          {loading ? (
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
          ) : (
            <OverviewCard
              SubscriptionData={SubscriptionData}
              currentUser={currentUser}
            />
          )}
          <h1 className="text-xl md:text-3xl p-2 mt-12">Dine abonementer</h1>{" "}
          <span className="border-b-2 border-white h-1 w-10/12 md:w-8/12"></span>
          {loading ? (
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
          ) : (
            <>
              {/* div for subCards + buttons */}
              <div className="flex flex-col items-center ">
                <div>
                  {/* Button for editing subs (if user has subs) */}
                  {SubscriptionData[0] ? (
                    <button
                      onClick={toggleEditMode}
                      class="bg-[#008B74] hover:bg-blue-600 text-sm text-white font-bold py-2 px-4 mx-2 rounded inline-flex items-center mt-5 "
                    >
                      <span>
                        {editMode
                          ? "Gem ændringer"
                          : "Tilføj & Rediger abonnementer"}
                      </span>
                    </button>
                  ) : (
                    ""
                  )}
                  {/* Button for adding subs (if user has NO subs or entered editing mode) */}
                  {editMode || !SubscriptionData[0] ? (
                    <button
                      onClick={openModal}
                      class="bg-[#008B74] hover:bg-blue-600 text-sm text-white font-bold py-2 px-4 mx-2 rounded inline-flex items-center mt-4"
                    >
                      <span>Tilføj abbonement</span>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-wrap justify-center">
                  {SubscriptionData.map((item) =>
                    item.type === "Mobile" ? (
                      <div className="px-6 py-5" key={item.subscriptionid}>
                        <SubscriptionCard
                          setSubscriptionData={setSubscriptionData}
                          setLoading={setLoading}
                          provider={item.provider}
                          talk={item.talktime === 9999 ? "FRI" : item.talktime}
                          data={
                            item.datamonth === 9999 ? "FRI" : item.datamonth
                          }
                          monthlyPrice={parseInt(item.pricemonth)}
                          editMode={editMode}
                          subscriptionId={item.subscriptionid}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </>
          )}
          <CreateModal
            addSubscriptionOptimistically={addSubscriptionOptimistically}
            toggleEditMode={toggleEditMode}
            userId={currentUser.uid}
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>
      </Layout>
    </>
  );
}
