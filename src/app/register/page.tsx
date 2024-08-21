"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import SVGShapes from "@/components/SVGShapes"; // Import the SVGShapes component
import { motion } from "framer-motion";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
      }),
    });
    if (response.ok) {
      alert('Registration successful!');
      router.push('/login');
    } else {
      alert('Registration failed');
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
  };

  return (
    <div className="relative flex flex-col md:flex-row pt-24 md:pr-16 md:pl-16 justify-between items-center h-screen w-screen bg-peach-100">
      {/* SVG Shapes in Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } }}
      >
        <SVGShapes showShape1={false} showShape2={true} />
      </motion.div>

      {/* Left Section with Title and Paragraph */}
      <motion.div
        className="flex flex-col items-center md:items-start text-center md:text-left p-10 md:w-1/2 space-y-4"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
      >
        <h1
          className="text-6xl md:text-8xl mb-10  text-black dark:text-white font-extralight"
          style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}
        >
          Register
        </h1>
        <p className="text-base md:text-sm dark:text-neutral-400 text-black md:w-4/5">
          Join our community by registering. Start your journey towards better mental health by tracking your mood, sharing your thoughts, and connecting with supportive people.
        </p>
      </motion.div>

      {/* Registration Form Section */}
      <motion.div
        className="w-full max-w-md md:w-1/2 p-4 md:p-8 rounded-3xl glassmorphism"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input 
                id="firstname" 
                placeholder="Tyler" 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input 
                id="lastname" 
                placeholder="Durden" 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              placeholder="tylerdurden" 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              placeholder="projectmayhem@fc.com" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              placeholder="••••••••" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          <motion.button
            className="bg-black dark:bg-white dark:text-black block w-full text-white rounded-md h-10 font-medium shadow-input dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] sm:py-2 sm:text-sm"
            type="submit"
            variants={fadeUpVariants}
            whileHover={{ scale: 1.05 }}
          >
            Sign up &rarr;
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

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default RegisterPage;
