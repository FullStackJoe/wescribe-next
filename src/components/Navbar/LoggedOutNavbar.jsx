import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
{
  /* SKAL SLETTES */
}
import { useAuth } from "@/firebase/AuthContext";
import Link from "next/link";

const LoggedOutNavbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px4 m">
      <h1 className="w-full text-3xl font-bold text-[#BD0060] m-4">
        <Link href="/">WESCRIBE.</Link>
      </h1>

      <ul className="hidden md:flex whitespace-nowrap">
        <li className="p-4">
          <Link href="/signup">Sign Up</Link>
        </li>
        <li className="p-4">
          {" "}
          <Link href="/login">Login</Link>
        </li>

        <li className="p-4">
          <Link href="/how">How it works</Link>
        </li>
        <li className="p-4">
          <Link href="/about">About us</Link>
        </li>
        <li className="p-4">
          <Link href="/">Home</Link>
        </li>
      </ul>

      <div onClick={handleNav} className="block md:hidden m-4">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
      <div
        className={
          nav
            ? "text-white fixed left-0 top-0 w-[60%] h-full bg-[#000300] ease-in-out duration-500"
            : "text-white fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#BD0060] m-4">
          WESCRIBE.
        </h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600">
            <Link href="/signup" onClick={handleNav}>
              Sign Up
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link href="/login" onClick={handleNav}>
              Login
            </Link>
          </li>

          <li className="p-4 border-b border-gray-600">
            <Link href="/how" onClick={handleNav}>
              How it works
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link href="/about" onClick={handleNav}>
              About us
            </Link>
          </li>
          <li className="p-4">
            <Link href="/" onClick={handleNav}>
              Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoggedOutNavbar;
