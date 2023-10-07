import React from "react";

export default function OverviewCard({
  headLine,
  mobile,
  streaming,
  broadband,
  other,
  total,
}) {
  return (
    <>
      <div className="flex flex-col items-center border-2 border-black lg:mx-6 w-8/12 rounded-3xl">
        <div className="flex flex-wrap w-full justify-center">
          <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7 pb-7 lg:ml-7">
            <p>Mobil</p>
            <p className="text-2xl pt-2 text-[#BD0060]">{mobile}</p>
            <p className="text-[#BD0060] pt-1">
              kr / {headLine === "Årligt" ? "år" : "md"}{" "}
            </p>
          </div>
          <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7">
            <p>Bredbånd</p>
            <p className="text-2xl pt-2 text-[#BD0060]">{broadband}</p>
            <p className="text-[#BD0060] pt-1">
              kr / {headLine === "Årligt" ? "år" : "md"}{" "}
            </p>
          </div>
          <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7">
            <p>Streaming</p>
            <p className="text-2xl pt-2 text-[#BD0060]">{streaming}</p>
            <p className="text-[#BD0060] pt-1">
              kr / {headLine === "Årligt" ? "år" : "md"}
            </p>
          </div>
          <div className="flex flex-col w-1/2 lg:w-2/12 items-center pt-7">
            <p>Andre</p>
            <p className="text-2xl pt-2 text-[#BD0060]">{other}</p>
            <p className="text-[#BD0060] pt-1">
              kr / {headLine === "Årligt" ? "år" : "md"}{" "}
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-2/12 items-center pt-7 lg:mr-5 pb-4">
            <p>Total </p>
            <p className="text-2xl pt-2 text-[#BD0060]"> {total} </p>{" "}
            <p className="text-[#BD0060] pt-1">
              kr / {headLine === "Årligt" ? "år" : "md"}{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
