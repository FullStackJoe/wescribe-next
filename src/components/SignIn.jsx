import React, { useRef, useState } from "react";
import { useAuth } from "@/firebase/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      router.push("/dashboard");
    } catch (e) {
      setError("Failed to Log In");
      console.log(e);
    }

    setLoading(false);
  }

  return (
    <div className="border-2 border-gray-700 flex flex-col justify-center items-center rounded-3xl w-80 px- py-5">
      <h2 className=" text-3xl flex justify-center">Log In</h2>

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
            className="my-2 rounded py-2 px-1 text-black"
            type="email"
            placeholder=" Enter your email"
            ref={emailRef}
          />
          <p className="">Password</p>
          <input
            type="password"
            className="my-2 rounded py-2 px-1 text-black"
            placeholder=" Enter your password"
            ref={passwordRef}
          />
          <button
            disabled={loading}
            type="submit"
            className="my-2 bg-[#139e87] hover:bg-blue-700  font-bold w-full py-1 px-2 rounded"
          >
            Log In
          </button>
        </form>
        <div className=" flex justify-center">
          <p>
            Don&apos;t have an account yet?
            <Link href="/pages/signup"> Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
