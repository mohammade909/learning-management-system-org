import React from "react";
import { Outlet } from "react-router-dom";
// import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MegaNavbar from "./MegaNavbar";

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <Navbar /> */}
      <MegaNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
