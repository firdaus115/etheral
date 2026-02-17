import React from "react";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import { Outlet } from "react-router";

const Wrapper = ({ children }) => {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Wrapper;
