"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LoginModal from "@/components/ui/loginModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      {/* Hero Section */}
      <motion.section
        className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold">
          Benvenuto nel <span className="text-blue-400">Cybersecurity Lab</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl">
          Esplora il nostro laboratorio di sicurezza informatica, ricerca e innovazione.
        </p>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl relative z-10">
          Un centro di eccellenza dedicato alla ricerca, formazione e sviluppo di soluzioni innovative per la sicurezza informatica in un mondo sempre più connesso.
        </p>
        <motion.div
          className="mt-6 flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            <a>Scopri i nostri progetti</a>
          </Button>

          <Button variant="outline" size="lg" onClick={() => router.push("contatti")}>
            <a >Contattaci</a>
          </Button>
          <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
        </motion.div>
      </motion.section>

      {/* Sezione Punti di Forza */}
      <section className="py-16 bg-white w-full text-gray-900 text-center">
        <h2 className="text-3xl font-bold">I nostri punti di forza</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {[
            { title: "Ricerca Avanzata", desc: "Sviluppiamo soluzioni innovative per la sicurezza informatica." },
            { title: "Formazione", desc: "Offriamo corsi e workshop di cybersecurity." },
            { title: "Progetti", desc: "Collaboriamo con aziende e università su progetti di sicurezza." },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 max-w-xs bg-gray-100 shadow-lg rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
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
              className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Image src={project.image} width={400} height={300} alt={project.title} />
              <h3 className="text-xl text-black font-semibold p-4">{project.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
