import React, { useState } from "react";

export default function OverviewCard({ SubscriptionData }) {
  const [yearly, setYearly] = useState(false);

  const initialPriceObject = {
    Mobile: 0,
    Internet: 0,
    Streaming: 0,
    Other: 0,
    Total: 0,
  };

  const monthlyPrices = SubscriptionData.reduce((acc, item) => {
    if (item.type in acc) {
      acc[item.type] += parseFloat(item.pricemonth);
      acc.Total += parseFloat(item.pricemonth);
    }
    return acc;
  }, initialPriceObject);

  const onClickYear = () => {
    setYearly(true); // Toggle the value of yearly
  };
  const onClickMonth = () => {
    setYearly(false); // Toggle the value of yearly
  };

  return (
    <>
      <div className="flex flex-col items-center w-full mt-4">
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
            <div className="flex flex-col items-center border-2 border-black lg:mx-6 w-8/12 rounded-3xl">
              <div className="flex flex-wrap w-full justify-center">
                <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7 pb-7 lg:ml-7">
                  <p>Mobil</p>
                  <p className="text-2xl pt-2 text-[#BD0060]">
                    {!yearly ? monthlyPrices.Mobile : monthlyPrices.Mobile * 12}
                  </p>
                  <p className="text-[#BD0060] pt-1">
                    kr / {yearly ? "år" : "md"}
                  </p>
                </div>
                <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7">
                  <p>Bredbånd</p>
                  <p className="text-2xl pt-2 text-[#BD0060]">
                    {!yearly
                      ? monthlyPrices.Internet
                      : monthlyPrices.Internet * 12}
                  </p>
                  <p className="text-[#BD0060] pt-1">
                    kr / {yearly ? "år" : "md"}
                  </p>
                </div>
                <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7">
                  <p>Streaming</p>
                  <p className="text-2xl pt-2 text-[#BD0060]">
                    {!yearly
                      ? monthlyPrices.Streaming
                      : monthlyPrices.Streaming * 12}
                  </p>
                  <p className="text-[#BD0060] pt-1">
                    kr / {yearly ? "år" : "md"}
                  </p>
                </div>
                <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7">
                  <p>Andre</p>
                  <p className="text-2xl pt-2 text-[#BD0060]">
                    {!yearly ? monthlyPrices.Other : monthlyPrices.Other * 12}
                  </p>
                  <p className="text-[#BD0060] pt-1">
                    kr / {yearly ? "år" : "md"}
                  </p>
                </div>
                <div className="flex flex-col w-full lg:w-2/12 items-center pt-7 lg:mr-5 pb-4">
                  <p>Total </p>
                  <p className="text-2xl pt-2 text-[#BD0060]">
                    {!yearly ? monthlyPrices.Total : monthlyPrices.Total * 12}
                  </p>
                  <p className="text-[#BD0060] pt-1">
                    kr / {yearly ? "år" : "md"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
