"use client";

import React, { useEffect, useState } from 'react';
import ClientNavbar from "@/components/ClientNavbar";
import BackgroundShape from "@/components/BackgroundShape";
import LoggedOutBackgroundShape from "@/components/LoggedOutBackgroundShape";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    console.log('Token from localStorage:', token);
    setIsLoggedIn(!!token);
    console.log('Is Logged In:', !!token);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkLoginStatus();

      const darkModePreference = localStorage.getItem("darkMode") === "true";
      setIsDarkMode(darkModePreference);
      document.documentElement.classList.toggle("dark", darkModePreference);

      // Listen for token changes
      const handleTokenChange = () => {
        checkLoginStatus();
      };

      window.addEventListener('tokenChanged', handleTokenChange);

      return () => {
        window.removeEventListener('tokenChanged', handleTokenChange);
      };
    }
  }, [pathname]);

  // Ensure that token is set properly during the initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('Token found during hydration:', token);
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <html lang="en" className=''>
      <body className={inter.className}>
        {isLoggedIn ? <BackgroundShape /> : <LoggedOutBackgroundShape />}
        <ClientNavbar 
          isLoggedIn={isLoggedIn} 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={isDarkMode} 
        />
        {children}
      </body>
    </html>
  );
}
