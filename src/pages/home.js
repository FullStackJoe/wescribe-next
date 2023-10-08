import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "@/components/layout";
import Hero from "@/components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>WeScribe - Abonnement scanner</title>
      </Head>
      <Layout>
        <Hero />
      </Layout>
    </>
  );
}
