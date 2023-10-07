import React from "react";
import { useAuth } from "@/firebase/AuthContext";
import LoggedOutNavbar from "./LoggedOutNavbar";
import LoggedInNavbar from "./LoggedInNavbar";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <>
      {!currentUser && <LoggedOutNavbar />}
      {currentUser && <LoggedInNavbar />}
    </>
  );
};

export default Navbar;
