"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    year: "",
    category: "",
    abstract: "",
    file: null as File | null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Torna alla home se non autenticato
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validazione dei campi
    const { title, authors, year, category, abstract, file } = formData;
    if (!title.trim() || !authors.trim() || !year || !category.trim() || !abstract.trim() || !file) {
      alert("Compila tutti i campi e seleziona un file!");
      return;
    }

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum <= 0) {
      alert("L'anno deve essere un numero valido e maggiore di 0!");
      return;
    }

    const data: FormData = new FormData();
    data.append("title", title.trim());
    data.append("authors", authors.trim());
    data.append("year", yearNum.toString());
    data.append("category", category.trim());
    data.append("abstract", abstract.trim());
    data.append("file", file);

    console.log("Dati inviati a /api/publications:", {
      title: title.trim(),
      authors: authors.trim(),
      year: yearNum,
      category: category.trim(),
      abstract: abstract.trim(),
      file: file.name,
    });

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Devi essere loggato come admin!");
      return;
    }

    const response = await fetch("/api/publications", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: data as FormData, 
    });

    if (response.ok) {
      alert("Pubblicazione caricata!");
      setFormData({ title: "", authors: "", year: "", category: "", abstract: "", file: null });
    } else {
      const errorData = await response.json();
      console.log("Errore da /api/publications:", errorData, "Status:", response.status);
      alert("Errore nel caricamento: " + response.status + " - " + JSON.stringify(errorData.detail));
    }
  };

  if (!isAuthenticated) return <p className="text-center">Caricamento...</p>;

  return (
    <main className="min-h-screen bg-gray-100 py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-black mb-12">Aggiungi Pubblicazione</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl text-black mx-auto space-y-6">
        <Input
          name="title"
          placeholder="Titolo"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          name="authors"
          placeholder="Autori"
          value={formData.authors}
          onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
          required
        />
        <Input
          name="year"
          placeholder="Anno"
          type="number"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          required
        />
        <Input
          name="category"
          placeholder="Categoria"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <Textarea
          name="abstract"
          placeholder="Abstract"
          value={formData.abstract}
          onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
          required
        />
        <Input
          type="file"
          onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
          required
        />
        <Button type="submit">Carica</Button>
      </form>
    </main>
  );
}