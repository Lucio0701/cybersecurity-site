"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Contatti() {
  return (
    <main className="p-8 min-h-screen bg-gray-100">
      <motion.h1
        className="text-5xl font-extrabold text-center text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contatti
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-center text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Se vuoi far parte anche tu del nostro team, non esitare a contattarci.
      </motion.p>
    </main>
  );
}