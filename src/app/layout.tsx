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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      console.log('Token from localStorage:', token);
      setIsLoggedIn(!!token);
      console.log('Is Logged In:', !!token);

      const darkModePreference = localStorage.getItem("darkMode") === "true";
      setIsDarkMode(darkModePreference);
      document.documentElement.classList.toggle("dark", darkModePreference);
    }
  }, [pathname]);

  useEffect(() => {
    const handleTokenChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      console.log('Token updated, Is Logged In:', !!token);
    };

    window.addEventListener('tokenChanged', handleTokenChange);

    return () => {
      window.removeEventListener('tokenChanged', handleTokenChange);
    };
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
    <html lang="en">
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
