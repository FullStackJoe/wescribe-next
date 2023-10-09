import React from "react";
import Image from "next/image";

export default function SubscriptionCard({
  setLoading,
  setSubscriptionData,
  provider,
  data,
  talk,
  monthlyPrice,
  editMode,
  subscriptionId,
}) {
  const handleDelete = () => {
    // Optimistically update the UI
    setSubscriptionData((prevSubscriptionData) =>
      prevSubscriptionData.filter(
        (item) => item.subscriptionid !== subscriptionId
      )
    );

    // Define the endpoint and the request options
    const url = "/api/deleteMobileSubscription/" + subscriptionId;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };

    // Send the DELETE request
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // The request was successful, do nothing
      })
      .catch((error) => {
        console.error("There was an error deleting the subscription:", error);
        // The request failed, revert the changes
        setSubscriptionData((prevSubscriptionData) => [
          ...prevSubscriptionData,
          {
            subscriptionid: subscriptionId,
            provider: provider,
            talktime: talk,
            datamonth: data,
            pricemonth: monthlyPrice,
          },
        ]);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center w-[365px]">
        <div className="relative flex flex-row items-center border-2 border-gray-500 rounded-md p-5 w-full">
          {/* ...rest of your code... */}
          {editMode ? (
            <Image
              className="absolute top-0 right-0 transform -translate-y-3 translate-x-3"
              src="/images/edit.png"
              alt="Edit icon"
              width={28} // width in pixels
              height={28} // height in pixels
              onClick={handleDelete}
            />
          ) : (
            ""
          )}

          <div className="flex w-6/12 h-full items-center">
            <p className="text-xl">{provider}</p>
          </div>
          <div className="flex flex-row items-center pl-6">
            <div className="border-gray-400 border-r-2 pr-3 flex flex-col items-center text-sm w-[80px]">
              <p>Data</p>
              <p className="text-xl">
                {data}
                {data !== "FRI" ? " GB" : ""}
              </p>
            </div>
            <div className="pl-5 flex flex-col items-center text-sm w-[45px]">
              <p>Timer</p>
              <p className="text-xl">{talk}</p>
              <p></p>
            </div>
          </div>
          <div className="pl-8 md:pl-12 flex flex-col items-center w-[200px]">
            <p className="text-xl text-[#BD0060]">{monthlyPrice}</p>{" "}
            <p className="text-[#BD0060]">kr / md</p>
          </div>
        </div>
      </div>
    </>
  );
}
