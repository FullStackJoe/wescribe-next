import React from "react";

function Savings({ saving }) {
  return saving ? (
    <div className="flex flex-col items-center mt-5 w-36">
      <p className="text-2xl text-center">
        Spar <span className="text-[#BD0060]">{saving} kr</span>
      </p>
      <p className="text-center">over 6 mdr</p>
    </div>
  ) : (
    <div className="flex flex-col items-center mt-5 w-36"></div>
  );
}

export default Savings;
