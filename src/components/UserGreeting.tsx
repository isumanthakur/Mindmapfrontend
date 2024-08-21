"use client";

import React from "react";
import { motion } from "framer-motion";

interface UserGreetingProps {
  username: string;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ username }) => {
  return (
    <motion.div
      className="w-full z-10 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <div className="pl-5 md:pt-5 w-full">
        <h1 className="text-4xl md:text-8xl" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}>
          Welcome
        </h1>
        <h1 className="text-2xl md:text-4xl font-semibold mt-2 md:mt-5">{username}</h1>
      </div>
    </motion.div>
  );
};

export default UserGreeting;
