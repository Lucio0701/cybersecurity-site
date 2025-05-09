"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LoginModal from "@/components/ui/loginModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTerminal, FaMicrochip, FaShieldAlt } from "react-icons/fa";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center bg-black text-white">
      <style>
        {`
          .typing {
            font-family: monospace;
            white-space: nowrap;
            overflow: hidden;
            border-right: 2px solid #0f0;
            width: 0;
            animation: typing 3s steps(30, end) forwards, blink 0.7s step-end infinite;
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

      <style>
        {`
          .home-button {
            position: relative;
            color: #00ff88;
            transition: all 0.3s ease-in-out;
          }
          .home-button::after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0%;
            height: 2px;
            background: #00ff88;
            transition: width 0.3s ease;
          }
          .home-button:hover::after {
            width: 100%;
          }

          @keyframes pulse-smooth {
            0%, 100% { transform: scale(1); opacity: 1 }
            50% { transform: scale(1.1); opacity: 0.7 }
          }

          .animate-smooth-pulse {
            animation: pulse-smooth 2s infinite;
          }
        `}
      </style>

      {/* Hero Section */}
      <motion.section
        className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 🔥 Logo in apertura */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeInOut"}}
        >
          <Image
            src="/logo_animato.svg"
            alt="Logo UNICAL Cybersecurity"
            width={220}
            height={220}
            className="mx-auto drop-shadow-[0_0_15px_#00ff00]"
            priority
          />
        </motion.div>

        <h1 className="text-5xl font-bold mb-2 text-green-400 typing">
          Benvenuto nel Cybersecurity Lab
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl">
          Esplora il nostro laboratorio di sicurezza informatica, ricerca e innovazione.
        </p>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          Un centro di eccellenza dedicato alla ricerca, formazione e sviluppo di soluzioni innovative per la sicurezza informatica in un mondo sempre più connesso.
        </p>

        <motion.div
          className="mt-6 flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Button variant="ghost" className="home-button" size="lg" onClick={() => router.push("progetti")}>
            <a>Scopri i nostri progetti</a>
          </Button>
          <Button variant="ghost" className="home-button" onClick={() => setIsModalOpen(true)}>
            <a>Contattaci</a>
          </Button>
          <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
        </motion.div>
      </motion.section>

      {/* Sezione Punti di Forza */}
      <section className="py-16 bg-gray-950 w-full text-gray-100 text-center">
        <h2 className="text-3xl font-bold text-green-400">I nostri punti di forza</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {[
            {
              title: "Ricerca Avanzata",
              desc: "Sviluppiamo soluzioni innovative per la sicurezza informatica.",
              icon: <FaMicrochip size={40} className="text-green-400 mb-3" />,
            },
            {
              title: "Formazione",
              desc: "Offriamo corsi e workshop di cybersecurity.",
              icon: <FaTerminal size={40} className="text-green-400 mb-3" />,
            },
            {
              title: "Progetti",
              desc: "Collaboriamo con aziende e università su progetti di sicurezza.",
              icon: <FaShieldAlt size={40} className="text-green-400 mb-3" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 max-w-xs bg-gray-800 shadow-lg rounded-lg border border-green-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sezione Progetti Recenti */}
      <section className="py-16 bg-gray-100 w-full text-center">
        <h2 className="text-3xl text-black font-bold">I nostri progetti</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {[
            { title: "Analisi Malware", image: "/malware.jpg" },
            { title: "Pentesting Avanzato", image: "/pentesting.jpg" },
            { title: "AI e Cybersecurity", image: "/cyber.jpg" },
          ].map((project, index) => (
            <motion.div
              key={index}
              className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={project.image}
                width={400}
                height={300}
                alt={project.title}
                className="w-full object-cover"
              />
              <h3 className="text-xl text-black font-semibold p-4">{project.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
