import React from "react";
import Profile from "../components/Profile.jsx";
import Layout from "@/components/layout.js";
import Head from "next/head.js";
import { useAuth } from "@/firebase/AuthContext";
import Login from "./login.js";

export default function ProfileDashboard() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>WeScribe - Min Profil</title>
      </Head>
      <Layout>
        <Profile />
      </Layout>
    </>
  );
}
