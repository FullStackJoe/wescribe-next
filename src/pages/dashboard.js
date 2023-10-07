import React, { useState, useEffect } from "react";
import SubscriptionCard from "@/components/Dashboard/SubscriptionCard";
import OverviewCard from "@/components/Dashboard/OverviewCard";
import CreateModal from "@/components/Dashboard/CreateModal";
import { useAuth } from "@/firebase/AuthContext";
import Layout from "@/components/layout";

export default function MyOverview() {
  const { currentUser, logout } = useAuth();
  const [SubscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true); /* Is not used */
  const [yearly, setYearly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("http://localhost:5001/api/v1/subscriptions/" + currentUser.uid)
      .then((response) => response.json())
      .then((fetchedData) => {
        setSubscriptionData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [refreshKey]);

  const handleSuccess = () => {
    setRefreshKey((prevKey) => prevKey + 1); // increment the refreshKey to trigger a new fetch
  };

  const monthlyMobilePrice = SubscriptionData.reduce((sum, item) => {
    if (item.type === "Mobile") {
      return sum + parseFloat(item.pricemonth);
    }
    return sum;
  }, 0);

  const monthlyBroadbandPrice = SubscriptionData.reduce((sum, item) => {
    if (item.type === "Internet") {
      return sum + parseFloat(item.pricemonth);
    }
    return sum;
  }, 0);

  const monthlyStreamingPrice = SubscriptionData.reduce((sum, item) => {
    if (item.type === "Streaming") {
      return sum + parseFloat(item.pricemonth);
    }
    return sum;
  }, 0);

  const monthlyOtherPrice = SubscriptionData.reduce((sum, item) => {
    if (item.type === "Other") {
      return sum + parseFloat(item.pricemonth);
    }
    return sum;
  }, 0);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const overviewProps = () => {
    if (!yearly) {
      return {
        headLine: "Månedligt",
        mobile: monthlyMobilePrice,
        broadband: monthlyBroadbandPrice,
        streaming: monthlyStreamingPrice,
        other: monthlyOtherPrice,
        total:
          monthlyMobilePrice +
          monthlyBroadbandPrice +
          monthlyStreamingPrice +
          monthlyOtherPrice,
      };
    } else {
      return {
        headLine: "Årligt",
        mobile: monthlyMobilePrice * 12,
        broadband: monthlyBroadbandPrice * 12,
        streaming: monthlyStreamingPrice * 12,
        other: monthlyOtherPrice * 12,
        total:
          (monthlyMobilePrice +
            monthlyBroadbandPrice +
            monthlyStreamingPrice +
            monthlyOtherPrice) *
          12,
      };
    }
  };
  const onClickYear = () => {
    setYearly(true); // Toggle the value of yearly
  };
  const onClickMonth = () => {
    setYearly(false); // Toggle the value of yearly
  };

  yearClassnames =
    "bg-custom-black hover:bg-blue-600 text-s font-bold w-6/12 rounded-t-full py-2 px-6 mt-3 mr-1";
  monthClassnames =
    "bg-#2f2f2f hover:bg-blue-600 text-s font-bold w-6/12 rounded-t-full py-2 px-6 mt-3 mr-1";
  var yearClassnames;

  var monthClassnames;

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center ">
          <h1 className="text-xl md:text-3xl p-2">Overblik over dit forbrug</h1>
          <span className="border-b-2 border-white h-1 w-10/12 md:w-8/12"></span>
          <div className="flex flex-row w-6/12 justify-center">
            <button
              className={`border-${
                yearly ? "black" : "2"
              }   text-s font-bold border-black border-b-0 w-6/12 rounded-t-full py-2 px-6 mt-3 mr-1'}`}
              onClick={onClickMonth}
            >
              Måned
            </button>
            <button
              className={`border-${
                yearly ? "2" : "black"
              }  text-s border-b-0 font-bold border-black w-6/12 rounded-t-full py-2 px-6 mt-3 mr-1'}`}
              onClick={onClickYear}
            >
              År
            </button>
          </div>
          <div className="flex flex-col w-full md:flex-row">
            <div className="flex justify-center m-auto w-full md:w-10/12">
              <OverviewCard {...overviewProps()} />
            </div>
          </div>
          <h1 className="text-xl md:text-3xl p-2">Dine abonementer</h1>{" "}
          <span className="border-b-2 border-white h-1 w-10/12 md:w-8/12"></span>
          <div>
            {SubscriptionData[0] ? (
              <button
                onClick={toggleEditMode}
                class="bg-[#008B74] hover:bg-blue-600 text-sm text-white font-bold py-2 px-4 mx-2 rounded inline-flex items-center mt-5 "
              >
                <span>
                  {editMode ? "Gem ændringer" : "Rediger abonnementer"}
                </span>
              </button>
            ) : (
              ""
            )}

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
                    provider={item.provider}
                    talk={item.talktime === 9999 ? "FRI" : item.talktime}
                    data={item.datamonth === 9999 ? "FRI" : item.datamonth}
                    monthlyPrice={parseInt(item.pricemonth)}
                    editMode={editMode}
                    subscriptionId={item.subscriptionid}
                    onSubmitSuccess={handleSuccess}
                  />
                </div>
              ) : null
            )}
          </div>
          <CreateModal
            userId={currentUser.uid}
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmitSuccess={handleSuccess}
          />
        </div>
      </Layout>
    </>
  );
}
