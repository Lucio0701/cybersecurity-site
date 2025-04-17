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
    <main className="min-h-screen bg-black text-green-400 font-mono py-16 relative">
      <style>
        {`
          .glitch {
            position: relative;
            display: inline-block;
            color: #0f0;
          }
          .glitch::before,
          .glitch::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            width: 100%;
            overflow: hidden;
            color: #0f0;
            background: black;
          }
          .glitch::before {
            animation: glitchTop 2s infinite linear alternate-reverse;
            top: -2px;
          }
          .glitch::after {
            animation: glitchBottom 2s infinite linear alternate-reverse;
            bottom: -2px;
          }

          @keyframes glitchTop {
            0% { clip-path: inset(0 0 85% 0); transform: translateX(-2px); }
            50% { clip-path: inset(0 0 10% 0); transform: translateX(2px); }
            100% { clip-path: inset(0 0 85% 0); transform: translateX(-2px); }
          }

          @keyframes glitchBottom {
            0% { clip-path: inset(85% 0 0 0); transform: translateX(2px); }
            50% { clip-path: inset(10% 0 0 0); transform: translateX(-2px); }
            100% { clip-path: inset(85% 0 0 0); transform: translateX(2px); }
          }
        `}
      </style>

      {/* Titolo con effetto glitch */}
      <motion.h1
        className="text-5xl font-bold text-center glitch"
        data-text="I Nostri Progetti"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        I Nostri Progetti
      </motion.h1>

      {/* Sottotitolo */}
      <motion.p
        className="text-md text-center text-gray-400 mt-4 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Scopri le nostre ricerche più avanzate nel campo della cybersecurity.
      </motion.p>

      {/* Griglia dei progetti */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 border border-green-500 rounded-lg shadow-xl overflow-hidden hover:shadow-green-500/50 transition-transform hover:scale-105 duration-300"
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
              className="w-full h-52 object-cover grayscale hover:grayscale-0 transition duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-300">{project.title}</h3>
              <p className="text-gray-400 mt-2">{project.description}</p>
              <button className="mt-4 px-4 py-2 border border-green-400 text-green-300 hover:bg-green-400 hover:text-black transition-colors rounded">
                Scopri di più
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sfondo effetto foschia digitale */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-400/10 to-transparent pointer-events-none z-[-1]" />
    </main>
  );
}
