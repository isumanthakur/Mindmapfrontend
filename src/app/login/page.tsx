"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import SVGShapes from "@/components/SVGShapes";
import { motion } from "framer-motion";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // API call to login
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    // Log the response from the API to ensure we're receiving a token
    console.log('API Response:', data);

    if (data.token) {
      // Log the token before setting it in localStorage
      console.log('Token received:', data.token);

      // Set the token in localStorage
      localStorage.setItem('token', data.token);

      // Verify the token was set correctly
      console.log('Token set in localStorage:', localStorage.getItem('token'));

      // Dispatch an event to notify other parts of the app
      window.dispatchEvent(new Event('tokenChanged'));

      // Redirect to the home page
      router.push('/home');
    } else {
      alert('Login failed');
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
  };

  return (
    <div className="relative flex pt-24 flex-col md:flex-row justify-between md:pr-20 md:pl-20 items-center h-screen w-screen bg-peach-100">
      {/* SVG Shapes in Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } }}
      >
        <SVGShapes showShape1={true} showShape2={false} />
      </motion.div>

      {/* Left Section with Title and Paragraph */}
      <motion.div
        className="flex flex-col items-center md:items-start text-center md:text-left p-10 md:w-1/2 space-y-4"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
      >
        <h1
          className="text-6xl md:text-8xl pb-10 md:pb-5 text-black dark:text-white font-extralight"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}
        >
          Log-in
        </h1>
        <p className="text-base md:text-sm text-black dark:text-neutral-400 md:w-4/5">
          Begin your journey with us by logging in. Explore the benefits of our mental health journal and track your mood, share your thoughts, and connect with a supportive community.
        </p>
      </motion.div>

      {/* Login Form Section */}
      <motion.div
        className="w-full max-w-md md:w-1/2 p-4 md:p-8 rounded-3xl glassmorphism"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div className="flex flex-col space-y-2" variants={fadeUpVariants}>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="tylerdurden"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </motion.div>
          <motion.div className="flex flex-col space-y-2" variants={fadeUpVariants}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>

          <motion.button
            className="bg-black dark:bg-white block w-full dark:text-black text-white rounded-md h-10 font-medium shadow-input dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] sm:py-2 sm:text-sm"
            type="submit"
            variants={fadeUpVariants}
            whileHover={{ scale: 1.05 }}
          >
            Login &rarr;
          </motion.button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <motion.div className="flex flex-col space-y-4" variants={fadeUpVariants}>
            <motion.button
              className="flex items-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-transparent dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] sm:py-2 sm:text-sm"
              type="button"
              whileHover={{ scale: 1.05 }}
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                GitHub
              </span>
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-transparent dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] sm:py-2 sm:text-sm"
              type="button"
              whileHover={{ scale: 1.05 }}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
