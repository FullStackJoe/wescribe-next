import React from "react";
import Image from "next/image";

export default function SubscriptionCard({
  provider,
  data,
  talk,
  monthlyPrice,
  editMode,
  subscriptionId,
  onSubmitSuccess,
}) {
  const handleDelete = () => {
    // Define the endpoint and the request options
    const url =
      "http://localhost:3000/api/deleteMobileSubscription/" + subscriptionId;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };

    // Send the DELETE request
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Here you can handle the response, for example:
        // - Show a success message
        // - Remove the item from the UI
        // - Etc.
      })
      .catch((error) => {
        console.error("There was an error deleting the subscription:", error);
        // Handle the error appropriately
      });
    onSubmitSuccess();
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center ">
        <div className="relative flex flex-row items-center  border-2 border-gray-500 rounded-md p-5">
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

          <div className="flex flex-grow">
            <p className="text-4xl">{provider}</p>
          </div>
          <div className="flex flex-row items-center pl-8 md:pl-12">
            <div className="border-gray-400 border-r-2 pr-3 flex flex-col items-center">
              <p>Data</p>
              <p className="text-2xl">
                {data} {data !== "FRI" ? " GB" : ""}
              </p>
            </div>
            <div className="pl-5 flex flex-col items-center">
              <p>Tale</p>
              <p className="text-2xl">{talk}</p>
            </div>
          </div>
          <div className="pl-8 md:pl-12 flex flex-col items-center">
            <p className="text-2xl text-[#BD0060]">{monthlyPrice}</p>{" "}
            <p className="text-[#BD0060]">kr / md</p>
          </div>
        </div>
      </div>
    </>
  );
}
