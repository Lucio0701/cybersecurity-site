"use client";

/*import { motion } from "framer-motion";
import Image from "next/image";

export default function ChiSiamo() {
  return (
    <main className="p-8 min-h-screen bg-gray-100">
      <motion.h1
        className="text-5xl font-extrabold text-center text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Chi Siamo
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-center text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Siamo un team di esperti in cybersecurity, etici hacker e ricercatori.
      </motion.p>

      <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/cybersecurity-team.jpg"
            alt="Il nostro team"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">La nostra missione</h2>
          <p className="mt-4 text-gray-700">
            Il nostro obiettivo è rendere il web un posto più sicuro, formando
            professionisti e analizzando vulnerabilità.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
*/

import { motion } from "framer-motion";
import Image from "next/image";

export default function ChiSiamo() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <motion.section
        className="w-full bg-gradient-to-b from-gray-900 to-black text-white py-20 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold">
          Chi Siamo
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Scopri il team e la missione dietro il Cybersecurity Lab, un punto di riferimento per la sicurezza informatica.
        </p>
      </motion.section>

      {/* Missione */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">La nostra missione</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Il Cybersecurity Lab nasce con l’obiettivo di proteggere il futuro digitale attraverso ricerca innovativa, formazione di alto livello e collaborazioni strategiche. Lavoriamo per anticipare le minacce informatiche, sviluppare soluzioni all’avanguardia e formare la prossima generazione di esperti in sicurezza.
        </p>
      </section>

      {/* Team */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Il nostro team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Nome 1",
              role: "Ruolo 1",
              image: "",
              bio: "Descrizione 1",
            },
            {
              name: "Nome 2",
              role: "Ruolo 2",
              image: "",
              bio: "Descrizione 2",
            },
            {
              name: "Nome 3",
              role: "Ruolo 3",
              image: "",
              bio: "Descrizione 3",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={member.image}
                width={150}
                height={150}
                alt={member.name}
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-blue-600">{member.role}</p>
              <p className="mt-2 text-gray-600">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Storia */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">La nostra storia</h2>
        <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
          <p className="mb-4">
            Fondato nel 2018, il Cybersecurity Lab è nato come risposta alla crescente necessità di proteggere le infrastrutture digitali in un mondo sempre più interconnesso. Da un piccolo gruppo di ricercatori appassionati, siamo cresciuti fino a diventare un centro riconosciuto a livello nazionale.
          </p>
          <p>
            Oggi collaboriamo con università, aziende tecnologiche e istituzioni governative per affrontare le sfide della sicurezza informatica, con un approccio che unisce teoria e pratica.
          </p>
        </div>
      </section>

      {/* Valori */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">I nostri valori</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Innovazione", desc: "Spingiamo i confini della tecnologia per anticipare le minacce." },
            { title: "Eccellenza", desc: "Puntiamo alla qualità in ogni aspetto del nostro lavoro." },
            { title: "Collaborazione", desc: "Crediamo nel potere del lavoro di squadra e delle partnership." },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-blue-600">{value.title}</h3>
              <p className="mt-2 text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}