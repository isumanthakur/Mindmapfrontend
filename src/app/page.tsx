"use client";

import React from "react";
import { motion } from "framer-motion";
import ExpandableCardDemo from "@/components/ExpandableCardDemo";
import TabsDemo from "@/components/TabsDemo";
import { WobbleCard } from "@/components/ui/wobble-card";

const Home: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } },
  };

  const pathHover = {
    strokeWidth: 1,
    stroke: ["#000", "#fff", "#000"],
    transition: { duration: 2, yoyo: Infinity, ease: "easeInOut" },
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center dark:text-white text-black">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl mb-4 z-10"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "0.2em" }}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          MindMap
        </motion.h1>

        <motion.svg
          className="absolute inset-0 w-full h-full md:pb-40 pointer-events-none dark:stroke-white stroke-black"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
          whileHover={pathHover}
          style={{
            maxWidth: "100vw",
            transform: "translateX(0%)",
            width: "100%",
          }}
        >
          <motion.path
            d="M 50 0 L 50 350 Q 50 450 100 450 Q 150 450 150 350 L 150 0"
            stroke="currentColor"
            fill="none"
            strokeWidth="0.05"
            transform="translate(1000, -160) scale(-1.5, 3.8) rotate(-90, 90, 90)"
          />
          <motion.path
            d="M 50 0 L 50 320 Q 50 450 100 450 Q 150 450 150 320 L 150 0"
            stroke="currentColor"
            fill="none"
            strokeWidth="0.2"
            className="m-10"
            transform="translate(0, 10) scale(1.4, 4) rotate(-90, 90, 90)"
          />
        </motion.svg>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-16">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px] glassmorphism"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black dark:text-white">
              Discover the Healing Power of Community
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-500">
              Connect with others who understand your journey. Share your experiences, support one another, and grow together.
            </p>
          </div>
          <div className="absolute gradient-bg -right-4 lg:-right-[40%] -bottom-10 object-contain rounded-2xl w-[600px] h-[300px]"></div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[300px] glassmorphism">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black dark:text:white">
            Unlock Your Inner Strength
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-500">
            Explore the tools and practices that can help you build resilience and navigate life&apos;s challenges with confidence
          </p>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 lg:col-span-3 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] glassmorphism">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black dark:text-white">
              Embrace the Power of Mindfulness
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-500">
              Learn how to live in the moment and find peace amidst the chaos. Mindfulness is a simple, yet profound way to transform your daily life.
            </p>
          </div>
          <div className="absolute gradient-bg -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-3xl w-[700px] h-[300px]"></div>
        </WobbleCard>
      </div>

      {/* Expandable Card Demo */}
      <div className="w-full mt-36 z-20 mx-auto max-w-7xl">
        <div className="rounded-3xl glassmorphism p-4">
          <ExpandableCardDemo />
        </div>
      </div>

      {/* Tabs Demo */}
      <div className="w-full">
        <TabsDemo />
      </div>

      {/* Footer */}
      <footer className="w-full z-20 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg py-12 mt-20 rounded-t-3xl text-center glassmorphism">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-300">
            {/* Company Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Your Company</h3>
              <p>Leading provider of awesome services and products.</p>
              <p className="mt-4">1234 Street Name, City, Country</p>
              <p>Email: info@yourcompany.com</p>
              <p>Phone: +123 456 7890</p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-black dark:hover:text-white">
                  Twitter
                </a>
                <a href="#" className="hover:text-black dark:hover:text:white">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-black dark:hover:text:white">
                  Instagram
                </a>
              </div>
            </div>

            {/* App Store Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Get Our App</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:opacity-75">
                  <img src="/a2.png" alt="App Store" className="w-14 opacity-50 h-auto" />
                </a>
                <a href="#" className="hover:opacity-75">
                  <img src="/a1.png" alt="Google Play" className="w-12 opacity-50 h-auto" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-6">
            <p className="text-sm">© 2024 Mind-Map. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
