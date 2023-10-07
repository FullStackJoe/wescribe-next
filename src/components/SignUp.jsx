import React, { useRef, useState } from "react";
import { useAuth } from "@/firebase/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "./layout";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      router.push("/pages/mysubscriptions");
    } catch (e) {
      setError("Failed to create account");
      console.log(e);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="border-2 border-gray-700 flex flex-col justify-center items-center rounded-3xl w-80 px- py-5">
        <h2 className=" text-3xl flex justify-center">Sign Up</h2>

        <br />
        {error && <p className="">{error}</p>}
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit}
            action="#"
            className="flex flex-col justify-center"
          >
            <p className="">Email</p>
            <input
              className="my-2 rounded py-2 px-1"
              type="email"
              placeholder=" Enter your email"
              ref={emailRef}
            />
            <p className="">Password</p>
            <input
              type="password"
              className="my-2 rounded py-2 px-1"
              placeholder=" Enter your password"
              ref={passwordRef}
            />
            <p className="">Passord Confirmation</p>
            <input
              type="password"
              className="my-2 rounded py-2 px-1"
              placeholder=" Confirm your password"
              ref={passwordConfirmRef}
            />
            <button
              disabled={loading}
              type="submit"
              className="my-2 bg-[#008B74] text-white hover:bg-blue-700 font-bold w-full py-1 px-2 rounded"
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-center">
            <p>
              Already have an account?
              <Link href="/dashboard"> Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
