import React from "react";
import Link from "next/link";

function HasNoSubs() {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-xl md:text-3xl">
        You dont have any subscriptions yet :(
      </h1>
      <br />
      <p>
        Go to{" "}
        <Link href="/dashboard" className="text-[#BD0060] text-sm md:text-xl">
          My dashboard
        </Link>{" "}
        to add your subscriptions
      </p>
    </div>
  );
}

export default HasNoSubs;
