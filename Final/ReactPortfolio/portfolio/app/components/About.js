"use client";

export default function About() {
  return (
    <section
      id="about"
      className="py-32 text-center max-w-4xl mx-auto px-6"
    >
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
        About Me
      </h2>
      <p className="text-lg opacity-80 mb-6">
        Hi! I'm Silas, a developer and designer passionate about creating
        engaging web experiences. I specialize in building modern,
        interactive, and performant web apps with React, Next.js, and
        Tailwind CSS.
      </p>
      <p className="text-lg opacity-70">
        I enjoy experimenting with UI animations, custom interactions,
        and bringing creative ideas to life through code. Currently
        exploring advanced frontend techniques, motion graphics, and
        building unique web portfolios like the one you're on now!
      </p>
    </section>
  );
}
