"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ScrollReveal({ children, delay = 0 }) {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) controls.start("visible");
    });

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.7, delay }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      {children}
    </motion.div>
  );
}
