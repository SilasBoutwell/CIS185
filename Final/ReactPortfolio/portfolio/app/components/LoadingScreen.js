"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Supercharged LoadingScreen
 *
 * Behavior:
 *  - Shows two visible bars that slide open
 *  - Reveals "Silas.dev" with gradient + glow + subtle RGB sweep
 *  - After 5s triggers an exit: text grows, lifts, blurs and fades while overlay fades out
 *  - Uses AnimatePresence.onExitComplete to remove the overlay after exit finishes
 *
 * Notes:
 *  - No external CSS required beyond Tailwind utilities; a few inline styles are used for effects.
 *  - Ensure you only import and render <LoadingScreen /> once (in layout.js) and do NOT make layout conditionally remove it.
 */

export default function LoadingScreen() {
  // controls: visible shows the overlay; exiting triggers the exit animations
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false); // final removal after exit completes

  useEffect(() => {
    // after 5 seconds start exit sequence
    const timer = setTimeout(() => setExiting(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // When exiting, we flip visible -> false but keep the AnimatePresence in DOM
  useEffect(() => {
    if (exiting) {
      // wait a tick then mark visible false so AnimatePresence runs exit animations
      // we keep AnimatePresence rendered until onExitComplete runs
      setVisible(false);
    }
  }, [exiting]);

  // If removed is true, don't render anything (fully finished)
  if (removed) return null;

  // Motion variants for re-use
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

  // text enter + exit handled by motion props below
  return (
    <AnimatePresence
      // when all exit animations are complete, remove overlay from React tree
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

          {/* Subtle noise/scanline (for cinematic polish) */}
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
            style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.03), transparent 10%)", zIndex: 20 }}
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

          {/* subtle bottom brand (optional) */}
          <motion.div
            className="absolute bottom-12 text-xs opacity-60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.6 }}
            style={{ letterSpacing: "0.08em" }}
          >
            {/* small tagline */}
            <span>development · coding · freelancing</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
