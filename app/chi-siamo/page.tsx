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
    <main className="p-8 min-h-screen bg-gray-100">
      {/* Titolo con animazione */}
      <motion.h1
        className="text-5xl font-extrabold text-center text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Chi Siamo
      </motion.h1>

      {/* Descrizione breve */}
      <motion.p
        className="mt-4 text-lg text-center text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Siamo un team di esperti in cybersecurity, etici hacker e ricercatori
        che lavorano per proteggere il mondo digitale. Scopri di più su di noi!
      </motion.p>

      {/* Sezione con immagine e testo */}
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
            professionisti, analizzando vulnerabilità e sviluppando strategie di
            difesa avanzate.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Il nostro team
        </h2>
        <div className="mt-8 flex text-black flex-wrap justify-center gap-8">
          {[
            { name: "Luca Rossi", role: "Ethical Hacker", image: "/team1.jpg" },
            { name: "Giulia Bianchi", role: "Malware Analyst", image: "/team2.jpg" },
            { name: "Marco Verdi", role: "Pentester", image: "/team3.jpg" },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center w-64"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Image
                src={member.image}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
