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

  // Scegli il servizio (Bridge)
  const publicationService: PublicationService = new ApiPublicationService(); // O FakePublicationService per test

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
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <motion.section
        className="w-full bg-gradient-to-b from-gray-900 to-black text-white py-20 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold">Pubblicazioni</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Scopri i nostri contributi alla ricerca nel campo della cybersecurity.
        </p>
      </motion.section>

      <section className="py-8 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex justify-center gap-4">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            Tutte
          </Button>
          <Button variant={filter === "Malware" ? "default" : "outline"} onClick={() => setFilter("Malware")}>
            Malware
          </Button>
          <Button variant={filter === "Pentesting" ? "default" : "outline"} onClick={() => setFilter("Pentesting")}>
            Pentesting
          </Button>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-600">Caricamento...</p>
          ) : filteredPublications.length === 0 ? (
            <p className="text-center text-gray-600">Nessuna pubblicazione trovata.</p>
          ) : (
            <div className="space-y-8">
              {filteredPublications.map((pub) => (
                <motion.div
                  key={pub.id}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <FileText className="w-12 h-12 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{pub.title}</h3>
                    <p className="text-gray-600 mt-1">Autori: {pub.authors}</p>
                    <p className="text-gray-600">Anno: {pub.year}</p>
                    <p className="text-gray-600 mt-2">{pub.abstract}</p>
                    <Button variant="link" className="mt-4 p-0 h-auto text-blue-600" asChild>
                      <a href={pub.link} target="_blank" rel="noopener noreferrer">
                        Leggi il documento
                      </a>
                    </Button>
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