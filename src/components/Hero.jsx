import React from "react";
import Link from "next/link";
import { useAuth } from "@/firebase/AuthContext";

function Hero() {
  const { currentUser, logout } = useAuth();
  const getStartedHref = currentUser ? "/dashboard" : "/signup";

  return (
    <div className="">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#BD0060] font-bold p-2">
          WESCRIBE ABONNEMENT SCANNER
        </p>
        <h1 className="md:text-6xl sm:text-6xl text-4xl font-bold md:py-6 py-2">
          FÅ OVERBLIK OVER DINE ABONNEMENTER
        </h1>
        <div className="flex justify-center items-center">
          <p className="text-[#BD0060] md:text-5xl sm:text-4xl text-xl font-bold py-4">
            SPAR PENGE HVER ENESTE MÅNED
          </p>
        </div>
        <p className="md:text-2xl text-xl font-bold text-white">
          SKIFT TIL DE BILLIGSTE ABONNEMENTER
        </p>

        <Link href={getStartedHref}>
          <button className="bg-[#008B74] hover:bg-blue-700 w-[200px] rounded-md font-medium my-6 mx-auto px-6 text-white">
            Kom i gang
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
