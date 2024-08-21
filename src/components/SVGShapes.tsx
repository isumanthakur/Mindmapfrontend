// components/SVGShapes.tsx

"use client";
import React from "react";
import { motion } from "framer-motion";

interface SVGShapesProps {
  showShape1?: boolean;
  showShape2?: boolean;
}

const SVGShapes: React.FC<SVGShapesProps> = ({ showShape1 = true, showShape2 = true }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const pathHover = {
    strokeWidth: 1,
    stroke: ["#000", "#fff", "#000"],
    transition: {
      duration: 2,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.svg
      className="absolute w-full h-full top-0 left-0 pointer-events-none dark:stroke-white stroke-black hidden md:block"
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
      initial="hidden"
      animate="visible"
      variants={pathVariants}
      whileHover={pathHover}
    >
      {showShape1 && (
        <motion.path
          d="M 50 0 L 50 350 Q 50 450 100 450 Q 150 450 150 350 L 150 0"
          stroke="currentColor"
          fill="none"
          strokeWidth="0.2"
          transform="translate(1000, -160) scale(-1.5, 3.8) rotate(-90, 90, 90)"
        />
      )}
      {showShape2 && (
        <motion.path
          d="M 50 0 L 50 320 Q 50 450 100 450 Q 150 450 150 320 L 150 0"
          stroke="currentColor"
          fill="none"
          strokeWidth="0.3"
          transform="translate(0, 10) scale(1.4, 4) rotate(-90, 90, 90)"
        />
      )}
    </motion.svg>
  );
};

export default SVGShapes;
