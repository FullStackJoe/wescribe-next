import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useAuth } from "../contexts/AuthContext";

const LoggedInNavbar = () => {
  // const { currentUser, logout } = useAuth();
  const [nav, setNav] = useState(false);
  const router = useRouter();

  const handleNav = () => {
    setNav(!nav);
  };

  async function handleLogout() {
    try {
      await logout();
      router.push("/login");
    } catch {}
  }

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px4 font-medium text-lg">
      <h1 className="w-full text-3xl font-bold text-[#BD0060] m-4">
        <Link href="/">WESCRIBE.</Link>
      </h1>

      <ul className="hidden md:flex whitespace-nowrap">
        <li className="p-4">
          <Link href="/dashboard">Mit overblik</Link>
        </li>
        <li className="p-4">
          <Link href="/findSubscriptions">Find billigere abbonementer</Link>
        </li>
        <li className="p-4">
          <Link href="/profile">Min Profil</Link>
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
        <h1 className="w-full text-3xl font-bold text-wescribe m-4">
          WESCRIBE.
        </h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600">
            <Link href="/dashboard" onClick={handleNav}>
              Mit overblik
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link href="/findSubscriptions" onClick={handleNav}>
              Abbonement Scanner
            </Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link href="/profile" onClick={handleNav}>
              Profil
            </Link>
          </li>
          <li className="p-4">
            <Link href="/" onClick={handleLogout}>
              Log ud
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoggedInNavbar;
