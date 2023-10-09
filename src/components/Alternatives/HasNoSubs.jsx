import React from "react";
import Link from "next/link";

function HasNoSubs() {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-xl md:text-3xl">
        Du har endnu ikke tilføjet nogle abonnementer til din profil :(
      </h1>
      <br />
      <p>
        Kom tilbage når du har været inde på{" "}
        <Link href="/dashboard" className="text-[#BD0060]">
          Mit Overblik
        </Link>{" "}
        og tilføjet dine abonnementer
      </p>
    </div>
  );
}

export default HasNoSubs;
