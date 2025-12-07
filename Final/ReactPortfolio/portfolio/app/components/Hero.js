"use client";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import BlobMorph from "./BlobMorph";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
      <BlobMorph />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(0,180,255,0.5)]"
      >
        Silas.dev
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-4 text-xl opacity-80"
      >
        Developer • Designer • Creator
      </motion.p>

      <MagneticButton
        className="mt-10 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-600/30 hover:opacity-90 transition"
        onClick={() => {
          document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
        }}>
        View My Work
      </MagneticButton>
    </section>
  );
}
