"use client";
import React from "react";
import { motion } from "framer-motion";

const ShimmerText = ({ children }: { children: string }) => {
  return (
    <motion.span
      initial={{ backgroundPositionX: "0%" }}
      animate={{ backgroundPositionX: "200%" }}
      transition={{
        repeat: Infinity,
        duration: 2.5,
        ease: "linear",
      }}
      className="inline-block text-transparent bg-clip-text bg-[linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0.6),rgba(255,255,255,0.1))] bg-[length:200%_100%]"
    >
      {children}
    </motion.span>
  );
};

export default ShimmerText;
