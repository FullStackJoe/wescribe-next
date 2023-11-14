import Login from "./login";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import SubscriptionCardMobile from "@/components/Dashboard/SubscriptionCardMobile";
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
    setSubscriptionData((prevSubscriptionData) => {
      // Extract the category from the new subscription
      const category = newSubscription.type;

      // Create a copy of the previous data
      const newData = { ...prevSubscriptionData };

      // Add the new subscription to the specified category
      newData[category] = [...newData[category], newSubscription];

      return newData;
    });
  };

  const onSubmitSuccess = (responseData, subTempId) => {
    setSubscriptionData((prevSubscriptionData) => {
      const updatedData = { ...prevSubscriptionData };

      // Iterate through each category in SubscriptionData
      for (const category in updatedData) {
        if (updatedData.hasOwnProperty(category)) {
          // Find the subscription with subTempId in the current category
          const updatedCategory = updatedData[category].map((subscription) =>
            subscription.subscriptionid === subTempId
              ? { ...subscription, subscriptionid: responseData.subscriptionid }
              : subscription
          );

          // Update the current category with the updated subscriptions
          updatedData[category] = updatedCategory;
        }
      }

      return updatedData;
    });
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
                  {SubscriptionData.mobile[0] ||
                  SubscriptionData.internet[0] ? (
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

                <div className="flex flex-wrap justify-center mt-5">
                  {SubscriptionData.mobile[0] ? (
                    <div className="text-center">
                      <p className="text-xl md:text-3xl">Mobil </p>
                      {SubscriptionData.mobile.map((item) => (
                        <div className="px-6 py-5" key={item.subscriptionid}>
                          <SubscriptionCardMobile
                            setSubscriptionData={setSubscriptionData}
                            provider={item.provider}
                            talk={
                              item.talktime === 9999 ? "FRI" : item.talktime
                            }
                            data={
                              item.datamonth === 9999 ? "FRI" : item.datamonth
                            }
                            monthlyPrice={parseInt(item.pricemonth)}
                            editMode={editMode}
                            subscriptionId={item.subscriptionid}
                            discount={item.discount}
                            type={item.type}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                  {SubscriptionData.internet[0] ? (
                    <div className="text-center">
                      <p className="text-xl md:text-3xl">Internet </p>
                      {SubscriptionData.internet.map((item) => (
                        <div className="px-6 py-5" key={item.subscriptionid}>
                          <SubscriptionCardMobile
                            setSubscriptionData={setSubscriptionData}
                            provider={item.provider}
                            talk={
                              item.talktime === 9999 ? "FRI" : item.talktime
                            }
                            data={
                              item.datamonth === 9999 ? "FRI" : item.datamonth
                            }
                            monthlyPrice={parseInt(item.pricemonth)}
                            editMode={editMode}
                            subscriptionId={item.subscriptionid}
                            discount={item.discount}
                            type={item.type}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                  {SubscriptionData.streaming[0] ? (
                    <div className="text-center">
                      <p className="text-xl md:text-3xl">Streaming </p>
                      {SubscriptionData.streaming.map((item) => (
                        <div className="px-6 py-5" key={item.subscriptionid}>
                          <SubscriptionCardMobile
                            setSubscriptionData={setSubscriptionData}
                            provider={item.provider}
                            talk={
                              item.talktime === 9999 ? "FRI" : item.talktime
                            }
                            data={
                              item.datamonth === 9999 ? "FRI" : item.datamonth
                            }
                            monthlyPrice={parseInt(item.pricemonth)}
                            editMode={editMode}
                            subscriptionId={item.subscriptionid}
                            discount={item.discount}
                            type={item.type}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
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
