import React from "react";
import Navbar from "./Navbar";
import { Text } from "@mantine/core";

const Header = () => {
  return (
    <header className="flex w-full justify-between max-w-screen-xl mx-auto py-8">
      <Text>Tyrel Chambers</Text>
      <Navbar />
    </header>
  );
};

export default Header;
