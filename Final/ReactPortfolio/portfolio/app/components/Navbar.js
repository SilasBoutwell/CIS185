"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 py-4">
      <div className="max-w-5xl mx-auto px-6 flex justify-between">
        
        <Link
          href="/"
          className="text-lg font-semibold cursor-none"
          data-cursor="nav"
        >
          Silas.dev
        </Link>

        <div className="flex gap-6 opacity-90">
          <Link
            href="#about"
            data-cursor="nav"
            className="cursor-none"
          >
            About
          </Link>

          <Link
            href="#projects"
            data-cursor="nav"
            className="cursor-none"
          >
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}
