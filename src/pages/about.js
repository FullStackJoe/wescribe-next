import Head from "next/head";
import Layout from "@/components/layout";

export default function About() {
  return (
    <>
      <Head>
        <title>WeScribe - Om os</title>
      </Head>
      <Layout>
        <h1 className="text-white text-3xl flex justify-center">About</h1>
      </Layout>
    </>
  );
}
