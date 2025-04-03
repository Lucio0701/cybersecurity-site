"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Progetti() {
  const projects = [
    {
      title: "Analisi Malware",
      image: "/malware.jpg",
      description: "Scopri come analizzare, scomporre e comprendere i malware moderni.",
    },
    {
      title: "Pentesting Avanzato",
      image: "/pentesting.jpg",
      description: "Tecniche di penetration testing per individuare e sfruttare vulnerabilità.",
    },
    {
      title: "AI e Cybersecurity",
      image: "/ai-cyber.jpg",
      description: "L’intelligenza artificiale applicata alla sicurezza informatica.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-900 text-white py-16">
      {/* Titolo animato */}
      <motion.h1
        className="text-5xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        I Nostri Progetti 🔥
      </motion.h1>

      {/* Sottotitolo */}
      <motion.p
        className="text-lg text-center text-gray-300 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Scopri le nostre ricerche più avanzate nel campo della cybersecurity.
      </motion.p>

      {/* Griglia dei progetti */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src={project.image}
              width={400}
              height={250}
              alt={project.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-gray-400 mt-2">{project.description}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition">
                Scopri di più
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Effetto di sfondo */}
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-20 bg-gradient-to-b from-blue-600 to-transparent z-[-1]" />
    </main>
  );
}
