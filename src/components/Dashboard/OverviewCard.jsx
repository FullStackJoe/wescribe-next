import React, { useState } from "react";

export default function OverviewCard({ SubscriptionData, currentUser }) {
  const [yearly, setYearly] = useState(false);

  const initialPriceObject = {
    mobile: 0,
    internet: 0,
    streaming: 0,
    other: 0,
    total: 0,
  };

  const monthlyPrices = Object.keys(SubscriptionData).reduce(
    (acc, category) => {
      const categoryTotal = SubscriptionData[category].reduce((total, item) => {
        return total + parseFloat(item.pricemonth);
      }, 0);

      acc[category] = categoryTotal;
      acc.total += categoryTotal;

      return acc;
    },
    initialPriceObject
  );

  console.log();

  const onClickYear = () => {
    setYearly(true); // Toggle the value of yearly
  };
  const onClickMonth = () => {
    setYearly(false); // Toggle the value of yearly
  };

  if (SubscriptionData.length === 0) {
    return (
      <p className="mt-12">
        Når du har tilføjet dine abonnementer vises dit månedlige overblik her
      </p>
    );
  }

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
                    {!yearly ? monthlyPrices.mobile : monthlyPrices.mobile * 12}
                  </p>
                  <p className="text-[#BD0060] pt-1">
                    kr / {yearly ? "år" : "md"}
                  </p>
                </div>
                <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7">
                  <p>Internet</p>
                  <p className="text-2xl pt-2 text-[#BD0060]">
                    {!yearly
                      ? monthlyPrices.internet
                      : monthlyPrices.internet * 12}
                  </p>
                  <p className="text-[#BD0060] pt-1">
                    kr / {yearly ? "år" : "md"}
                  </p>
                </div>
                <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7">
                  <p>Streaming</p>
                  <p className="text-2xl pt-2 text-[#BD0060]">
                    {!yearly
                      ? monthlyPrices.streaming
                      : monthlyPrices.streaming * 12}
                  </p>
                  <p className="text-[#BD0060] pt-1">
                    kr / {yearly ? "år" : "md"}
                  </p>
                </div>
                <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7">
                  <p>Andre</p>
                  <p className="text-2xl pt-2 text-[#BD0060]">
                    {!yearly ? monthlyPrices.other : monthlyPrices.other * 12}
                  </p>
                  <p className="text-[#BD0060] pt-1">
                    kr / {yearly ? "år" : "md"}
                  </p>
                </div>
                <div className="flex flex-col w-full lg:w-2/12 items-center pt-7 lg:mr-5 pb-4">
                  <p>Total </p>
                  <p className="text-2xl pt-2 text-[#BD0060]">
                    {!yearly ? monthlyPrices.total : monthlyPrices.total * 12}
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
