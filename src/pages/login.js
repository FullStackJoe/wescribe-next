import Layout from "@/components/layout.js";
import SignIn from "@/components/SignIn.jsx";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>WeScribe - Login</title>
      </Head>
      <Layout>
        <div className="py-10 flex justify-center items-center w-1/1">
          <SignIn />
        </div>
      </Layout>
    </>
  );
}
