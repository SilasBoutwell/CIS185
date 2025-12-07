'use client';
import { motion } from "framer-motion";


const projects = [
  {
    title: "God and I Time App",
    description: "A React Native and Expo app that will allow users to make and store devotions.",
    link: "https://github.com/SilasBoutwell/GodAndITime"
  },
  {
    title: "Testimonies Website",
    description: "A website I made for our church to be able to share testimonies easily.",
    link: "https://github.com/SilasBoutwell/testimonies.us"
  },
  {
    title: "Many Fun Projects",
    description: "This repository is from a Web Development class that I took and made many cool projects from, including this one!",
    link: "https://github.com/SilasBoutwell/CIS185"
  }
];


export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <h2 className="text-4xl font-bold mb-12 gradient-text">Projects</h2>


      <div className="grid md:grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <motion.a
            key={i}
            href={project.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition shadow-lg backdrop-blur cursor-pointer"
            target="_blank"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
            <p className="text-gray-300 text-sm">{project.description}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}