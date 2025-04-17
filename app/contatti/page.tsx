/*"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Contatti() {
  return (
    <main className="p-8 min-h-screen bg-gray-100">
      <motion.h1
        className="text-5xl font-extrabold text-center text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contatti
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-center text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Se vuoi far parte anche tu del nostro team, non esitare a contattarci.
      </motion.p>
    </main>
  );
}*/
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contatti() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dati inviati:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

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
        <h1 className="text-5xl md:text-6xl font-bold text-green-400 typing">Contattaci</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Siamo qui per rispondere alle tue domande e collaborare su progetti di cybersecurity.
        </p>
      </motion.section>

      {/* Sezione Informazioni di Contatto */}
      <section className="py-16 px-6 max-w-6xl mx-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Mail className="w-10 h-10 text-green-400 mb-4" />,
              title: "Email",
              info: "info@cyberlab.com",
            },
            {
              icon: <Phone className="w-10 h-10 text-green-400 mb-4" />,
              title: "Telefono",
              info: "+39 123 456 7890",
            },
            {
              icon: <MapPin className="w-10 h-10 text-green-400 mb-4" />,
              title: "Sede",
              info: "Via Pietro Bucci, 87036 Arcavacata, Cosenza",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-gray-900 p-6 rounded-lg border border-green-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {item.icon}
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-300">{item.info}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modulo di Contatto */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Invia un messaggio</h2>
          {submitted ? (
            <motion.p
              className="text-green-500 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Messaggio inviato con successo! Ti risponderemo presto.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Input
                  name="name"
                  placeholder="Il tuo nome"
                  className="bg-black border border-green-400 text-white"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Input
                  name="email"
                  type="email"
                  placeholder="La tua email"
                  className="bg-black border border-green-400 text-white"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Textarea
                  name="message"
                  placeholder="Il tuo messaggio"
                  className="bg-black border border-green-400 text-white"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </motion.div>
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold">
                Invia
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Mappa */}
      <section className="py-16 px-6 bg-black">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Dove siamo</h2>
        <div className="max-w-4xl mx-auto border-4 border-green-500 rounded-md overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.7543634149965!2d16.223554775772747!3d39.36179887162865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133f999aaa86af19%3A0xe6050cd7c28559ba!2sUniversit%C3%A0%20della%20Calabria!5e0!3m2!1sit!2sit!4v1743667999410!5m2!1sit!2sit"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
