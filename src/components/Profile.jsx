import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/firebase/AuthContext";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      router.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="flex">
        <div className="border-2 border-gray-700 flex flex-col justify-center items-center rounded-3xl px-5 py-5 m-auto">
          <h2 className="font-bold">PROFILSIDEN ER WORK IN PROGRESS</h2>
          <br />
          <h2 className="text-3xl flex justify-center">Profile</h2>
          <p className="flex">
            Email: {currentUser ? currentUser.email : "Not logged in"}
          </p>
          <p className="flex">
            User ID: {currentUser ? currentUser.uid : "Not logged in"}
          </p>
          <br />
          <Link className="w-full flex justify-center" href="">
            <button class="bg-[#139e87] hover:bg-blue-700 font-bold py-2 px-4 rounded">
              Update profile
            </button>
          </Link>
          <br />
          <button
            className="bg-[#139e87] hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
