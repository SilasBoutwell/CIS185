"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (exiting) {
      setVisible(false);
    }
  }, [exiting]);

  if (removed) return null;

  const overlayVariants = {
    initial: { opacity: 1 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } },
  };

  const barVariantTop = {
    initial: { height: "50%" },
    open: { height: 0, transition: { duration: 1.5, delay: 0.8, ease: "easeInOut" } },
  };
  const barVariantBottom = {
    initial: { height: "50%" },
    open: { height: 0, transition: { duration: 1.5, delay: 0.8, ease: "easeInOut" } },
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        setRemoved(true);
      }}
    >
      {visible && (
        <motion.div
          key="loader-overlay"
          className="fixed inset-0 flex items-center justify-center bg-black z-[9999] overflow-hidden"
          variants={overlayVariants}
          initial="initial"
          animate="visible"
          exit="exit"
        >
          {/* TOP BAR (visible color so it shows on black background) */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#0f1724] to-[#0b0b0b]"
            variants={barVariantTop}
            initial="initial"
            animate="open"
            style={{ zIndex: 30 }}
          />

          {/* BOTTOM BAR */}
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#0f1724] to-[#090909]"
            variants={barVariantBottom}
            initial="initial"
            animate="open"
            style={{ zIndex: 30 }}
          />

          {/* Subtle scanline */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            style={{
              background:
                "repeating-linear-gradient(180deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 3px)",
              zIndex: 25,
            }}
          />

          {/* decorative flicker particles */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.12, 0], transition: { duration: 2.0, delay: 1.2 } }}
            style={{ background: "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.03), transparent 10%)", zIndex: 20 }}
          />

          {/* SILAS.DEV center text with enter+exit animation */}
          <motion.h1
            key="loader-text"
            className="relative z-40 text-5xl md:text-6xl font-extrabold text-center tracking-tight"
            initial={{ opacity: 0, scale: 0.86, y: 6 }}
            animate={{
              opacity: 1,
              scale: 1.02,
              y: 0,
              transition: { delay: 1.98, duration: 1.05, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              scale: 1.9,
              y: -80,
              filter: "blur(6px)",
              transition: { duration: 0.95, ease: "easeInOut" },
            }}
            style={{
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              backgroundImage: "linear-gradient(90deg,#00e6ff,#7c3aed,#ff7aa2)",
              textShadow: "0 6px 30px rgba(124,58,237,0.12)",
            }}
          >
            {/* inner span used for a subtle RGB sweep via backgroundPosition animation */}
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
              style={{
                display: "inline-block",
                backgroundImage: "linear-gradient(90deg,#00e6ff 0%, #7c3aed 50%, #ff7aa2 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Silas.dev
            </motion.span>
          </motion.h1>

          {/* subtle bottom text */}
          <motion.div
            className="absolute bottom-12 text-xs opacity-60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.6 }}
            style={{ letterSpacing: "0.08em" }}
          >
            <span>development · coding · freelancing</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
