import React from "react";

function Savings({ saving }) {
  return (
    <div className="flex flex-col items-center mt-5 w-36">
      <p className="text-2xl text-center">Spar {saving} kr</p>
      <p className="text-center">over 6 mdr</p>
    </div>
  );
}

export default Savings;
