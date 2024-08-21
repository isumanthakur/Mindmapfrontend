import React, { useState } from "react";
import { MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

interface NavbarProps {
  isLoggedIn: boolean;
  className?: string;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ className, isLoggedIn, toggleDarkMode, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <div className="flex justify-between items-center px-4 md:px-0">
        {/* Hamburger Menu Button - Only visible on small screens */}
        <button onClick={toggleMenu} className="md:hidden text-2xl relative z-50">
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Regular Navbar for larger screens */}
        <div className="hidden md:flex items-center w-full max-w-3xl rounded-full border border-black dark:border-white z-50 px-4 py-3 bg-transparent shadow-lg">
          <div className="flex items-center justify-center space-x-4 flex-grow">
            <MenuItem item="Home" href={isLoggedIn ? "/home" : "/"} />
            {isLoggedIn ? (
              <>
                <MenuItem item="Journal" href="/journal" />
                <MenuItem item="Community" href="/community" />
                <MenuItem item="Profile" href="/profile" />
              </>
            ) : (
              <>
                <MenuItem item="Login" href="/login" />
                <MenuItem item="Register" href="/register" />
              </>
            )}
          </div>
          <div className="flex items-center">
            <button 
              onClick={toggleDarkMode} 
              className="px-3 py-2 border rounded-full text-white bg-black dark:bg-white dark:text-black border-black dark:border-white"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ x: "100%" }} 
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn("fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden")}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-4/5 max-w-sm glassmorphism shadow-lg z-50 p-6"
        >
          <div className="flex flex-col items-center justify-center space-y-8 h-full">
            <MenuItem item="Home" href={isLoggedIn ? "/home" : "/"} className="text-center" />
            {isLoggedIn ? (
              <>
                <MenuItem item="Journal" href="/journal" className="text-center" />
                <MenuItem item="Community" href="/community" className="text-center" />
                <MenuItem item="Profile" href="/profile" className="text-center" />
              </>
            ) : (
              <>
                <MenuItem item="Login" href="/login" className="text-center" />
                <MenuItem item="Register" href="/register" className="text-center" />
              </>
            )}
            <button 
              onClick={toggleDarkMode} 
              className="px-3 py-2 border rounded-full text-white bg-black dark:bg-white dark:text-black border-black dark:border-white"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;
