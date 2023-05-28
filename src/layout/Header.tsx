import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="flex w-full justify-between max-w-screen-xl mx-auto py-8 px-4 xl:px-0">
      <p className="font-bold">Tyrel Chambers</p>
      <Navbar />
    </header>
  );
};

export default Header;
