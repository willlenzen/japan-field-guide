"use client";

import { motion } from "framer-motion";
import FlagCanvas from "@/components/flag-canvas";

interface SplashProps {
  isReady: boolean;
  onDone: () => void;
}

export default function Splash({ isReady, onDone }: SplashProps) {
  /* Still loading → static splash */
  if (!isReady) {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{ backgroundColor: "var(--ro)" }}
      >
        <div className="block md:hidden">
          <FlagCanvas width={280} height={190} />
        </div>
        <div className="hidden md:block">
          <FlagCanvas width={340} height={230} />
        </div>
        <p
          className="font-mono text-[11px] mt-6"
          style={{ color: "var(--sunezumi)", animation: "pulse-text 2s ease-in-out infinite" }}
        >
          Initializing Field Guide...
        </p>
      </div>
    );
  }

  /* Ready → transition out */
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--ro)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
      onAnimationComplete={onDone}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 0.08, x: "-42vw", y: "-42vh" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="block md:hidden">
          <FlagCanvas width={280} height={190} />
        </div>
        <div className="hidden md:block">
          <FlagCanvas width={340} height={230} />
        </div>
      </motion.div>
      <motion.p
        className="font-mono text-[11px] text-sunezumi mt-6"
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        Initializing Field Guide...
      </motion.p>
    </motion.div>
  );
}
