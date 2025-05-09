"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import {
  Publication,
  PublicationService,
  FakePublicationService,
  ApiPublicationService,
} from "@/components/services/publicationService";

export default function Pubblicazioni() {
  const [filter, setFilter] = useState("all");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  const publicationService: PublicationService = new ApiPublicationService();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await publicationService.getPublications();
        setPublications(data);
      } catch (error) {
        console.error("Errore:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  const filteredPublications =
    filter === "all" ? publications : publications.filter((pub) => pub.category === filter);

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono">
      {/* Hero Section */}
      <motion.section
        className="w-full bg-gradient-to-b from-black to-gray-900 text-green-400 py-20 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide">Pubblicazioni 📚</h1>
        <p className="mt-4 text-lg md:text-xl text-green-300 max-w-3xl mx-auto">
          I nostri contributi alla ricerca nel campo della cybersecurity.
        </p>
      </motion.section>

      {/* Filtro */}
      <section className="py-8 px-6 bg-black border-b border-green-500">
        <div className="max-w-5xl mx-auto flex justify-center gap-4 flex-wrap">
          {["all", "Malware", "Pentesting"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded border font-semibold transition-colors ${
                filter === cat
                  ? "bg-green-500 text-black"
                  : "border-green-500 text-green-400 hover:bg-green-600 hover:text-black"
              }`}
            >
              {cat === "all" ? "Tutte" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Pubblicazioni */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <p className="text-center text-green-300">[ Caricamento in corso... ]</p>
          ) : filteredPublications.length === 0 ? (
            <p className="text-center text-green-300">[ Nessuna pubblicazione trovata ]</p>
          ) : (
            <div className="space-y-8">
              {filteredPublications.map((pub) => (
                <motion.div
                  key={pub.id}
                  className="bg-gray-900 border border-green-600 p-6 rounded-lg shadow-md shadow-green-500/20 flex flex-col md:flex-row gap-6 hover:shadow-green-400/30 transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <FileText className="w-12 h-12 text-green-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-green-300">{pub.title}</h3>
                    <p className="text-sm text-green-500 mt-1">Autori: {pub.authors}</p>
                    <p className="text-sm text-green-500">Anno: {pub.year}</p>
                    <p className="text-green-200 mt-4 text-sm">{pub.abstract}</p>
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-green-400 hover:text-green-200 underline underline-offset-4 transition"
                    >
                      ➤ Leggi il documento
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
