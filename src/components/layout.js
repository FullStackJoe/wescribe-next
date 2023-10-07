import Head from "next/head";
import Navbar from "./Navbar/Navbar";

export default function Layout({ children, home }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
