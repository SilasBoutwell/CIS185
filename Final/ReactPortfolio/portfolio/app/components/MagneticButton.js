"use client";
import { useRef } from "react";

export default function MagneticButton({ children, className, ...props }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const reset = () => {
    ref.current.style.transform = `translate(0,0)`;
  };

  return (
    <button
      data-magnetic
      onMouseMove={handleMove}
      onMouseLeave={reset}
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
