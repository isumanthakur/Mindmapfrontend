"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface ClientNavbarProps {
  isLoggedIn: boolean;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({ isLoggedIn, toggleDarkMode, isDarkMode }) => {
  return (
    <Navbar 
      isLoggedIn={isLoggedIn} 
      toggleDarkMode={toggleDarkMode} 
      isDarkMode={isDarkMode} 
    />
  );
};

export default ClientNavbar;
