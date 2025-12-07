"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  const [navTarget, setNavTarget] = useState(null);

  // --- LIVE MOUSE TRACKING ---
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      // Cursor = moves instantly
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Follower = smooth (only if not in nav mode)
      if (!navTarget) {
        followerX += ((mouseX - followerX) * 0.12) - 1.1;
        followerY += ((mouseY - followerY) * 0.12) - 1.1;
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    requestAnimationFrame(tick);

    return () => window.removeEventListener("mousemove", handleMove);
  }, [navTarget]);

  // --- Detect nav link hover ---
  useEffect(() => {
    const links = document.querySelectorAll("[data-cursor='nav']");

    const enter = (e) => setNavTarget(e.target);
    const leave = () => setNavTarget(null);

    links.forEach((l) => {
      l.addEventListener("mouseenter", enter);
      l.addEventListener("mouseleave", leave);
    });

    return () =>
      links.forEach((l) => {
        l.removeEventListener("mouseenter", enter);
        l.removeEventListener("mouseleave", leave);
      });
  }, []);

  const navRect = navTarget?.getBoundingClientRect() ?? null;

  return (
    <>
      {/* MAIN cursor (zero lag) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]
                   bg-white mix-blend-difference"
      ></div>

      {/* FOLLOWER (disabled on nav links) */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]
                    border border-white/40 transition-opacity
                    ${navTarget ? "opacity-0" : "opacity-100"}`}
      ></div>

      {/* NAV UNDERLINE MODE */}
      <AnimatePresence>
        {navTarget && navRect && (
          <motion.div
            key="nav-underline"
            className="fixed z-[9999] pointer-events-none"
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={{
              opacity: 1,
              scaleX: 1,
              x: navRect.left,
              y: navRect.bottom + 4,
              width: navRect.width,
            }}
            exit={{ opacity: 0, scaleX: 0.2 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="h-[3px] w-full bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
