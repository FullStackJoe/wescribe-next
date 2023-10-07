import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import Hero from "@/components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Layout>
        <Hero />
      </Layout>
    </>
  );
}
