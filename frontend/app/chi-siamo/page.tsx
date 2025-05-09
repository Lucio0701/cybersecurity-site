"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaBrain, FaAward, FaUsers } from "react-icons/fa";

export default function ChiSiamo() {
  return (
    <main className="min-h-screen bg-black text-white font-mono">
      <style>
        {`
          .typing {
            font-family: monospace;
            white-space: nowrap;
            overflow: hidden;
            border-right: 2px solid #0f0;
            width: 0;
            animation: typing 3s steps(40, end) forwards, blink 0.7s step-end infinite;
          }

          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink {
            50% { border-color: transparent }
          }
        `}
      </style>

      {/* Hero Section */}
      <motion.section
        className="w-full bg-gradient-to-b from-black to-gray-900 text-white py-20 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-green-400 typing">
          Chi Siamo
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Scopri il team e la missione dietro il Cybersecurity Lab, un punto di riferimento per la sicurezza informatica.
        </p>
      </motion.section>

      {/* Missione */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-green-400">La nostra missione</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Il Cybersecurity Lab nasce con l’obiettivo di proteggere il futuro digitale attraverso ricerca innovativa, formazione di alto livello e collaborazioni strategiche. Lavoriamo per anticipare le minacce informatiche, sviluppare soluzioni all’avanguardia e formare la prossima generazione di esperti in sicurezza.
        </p>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-900 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-400">Il nostro team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Nome 1",
              role: "Ethical Hacker",
              image: "",
              bio: "Specializzato in penetration testing e sicurezza delle reti.",
            },
            {
              name: "Nome 2",
              role: "Cyber Analyst",
              image: "",
              bio: "Esperto in analisi malware e threat intelligence.",
            },
            {
              name: "Nome 3",
              role: "AI Researcher",
              image: "",
              bio: "Studia l'integrazione tra intelligenza artificiale e sicurezza.",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-black p-6 border border-green-500 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-24 h-24 bg-gray-800 rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-green-400">{member.role}</p>
              <p className="mt-2 text-gray-400">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Storia */}
      <section className="py-16 px-6 bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-green-400">La nostra storia</h2>
        <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed">
          <p className="mb-4">
            Fondato nel 2018, il Cybersecurity Lab è nato come risposta alla crescente necessità di proteggere le infrastrutture digitali in un mondo sempre più interconnesso. Da un piccolo gruppo di ricercatori appassionati, siamo cresciuti fino a diventare un centro riconosciuto a livello nazionale.
          </p>
          <p>
            Oggi collaboriamo con università, aziende tecnologiche e istituzioni governative per affrontare le sfide della sicurezza informatica, con un approccio che unisce teoria e pratica.
          </p>
        </div>
      </section>

      {/* Valori */}
      <section className="py-16 px-6 max-w-5xl mx-auto bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-400">I nostri valori</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Innovazione",
              desc: "Spingiamo i confini della tecnologia per anticipare le minacce.",
              icon: <FaBrain className="mx-auto text-green-400 mb-3" size={36} />,
            },
            {
              title: "Eccellenza",
              desc: "Puntiamo alla qualità in ogni aspetto del nostro lavoro.",
              icon: <FaAward className="mx-auto text-green-400 mb-3" size={36} />,
            },
            {
              title: "Collaborazione",
              desc: "Crediamo nel potere del lavoro di squadra e delle partnership.",
              icon: <FaUsers className="mx-auto text-green-400 mb-3" size={36} />,
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="p-4 bg-black border border-green-500 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {value.icon}
              <h3 className="text-xl font-semibold text-white">{value.title}</h3>
              <p className="mt-2 text-gray-400">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
