import SignUp from "@/components/SignUp.jsx";
import Layout from "@/components/layout";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>WeScribe - Opret profil</title>
      </Head>
      <Layout>
        <div className="py-10 flex justify-center items-center w-1/1">
          <SignUp />
        </div>
      </Layout>
    </>
  );
}
