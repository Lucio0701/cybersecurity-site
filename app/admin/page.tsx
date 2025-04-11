"use client";
/*
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

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Devi essere loggato come admin!");
      return;
    }

    // Prima richiesta: invia i dati testuali
    const textData = {
      title: title.trim(),
      authors: authors.trim(),
      year: yearNum,
      category: category.trim(),
      abstract: abstract.trim(),
    };

    console.log("Dati inviati a /api/addPublications:", textData);

    const textResponse = await fetch("/api/addPublications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(textData),
    });

    if (!textResponse.ok) {
      const errorData = await textResponse.json();
      console.log("Errore da /api/addPublications:", errorData, "Status:", textResponse.status);
      alert("Errore nel salvataggio dei dati: " + textResponse.status + " - " + JSON.stringify(errorData.detail));
      return;
    }

    const textResult = await textResponse.json();
    const publicationId = textResult.publication_id;
    console.log("Risposta da /api/addPublications:", textResult);

    // Seconda richiesta: invia il file
    const fileData = new FormData();
    fileData.append("publication_id", publicationId.toString());
    fileData.append("file", file);

    console.log("Dati inviati a /api/uploadFile:", {
      publication_id: publicationId,
      file: file.name,
    });

    const fileResponse = await fetch("/api/uploadFile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fileData,
    });

    if (fileResponse.ok) {
      alert("Pubblicazione caricata con successo!");
      setFormData({ title: "", authors: "", year: "", category: "", abstract: "", file: null });
    } else {
      const errorData = await fileResponse.json();
      console.log("Errore da /api/uploadFile:", errorData, "Status:", fileResponse.status);
      alert("Errore nel caricamento del file: " + fileResponse.status + " - " + JSON.stringify(errorData.detail));
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
}*/
"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaFilePdf, FaEdit, FaDownload } from "react-icons/fa";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stato per la modifica
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPublication, setEditPublication] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthors, setEditAuthors] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAbstract, setEditAbstract] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  // Stato per l'esportazione
  const [exportFormat, setExportFormat] = useState("json");

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/publications");
      if (!response.ok) throw new Error("Errore nel caricamento delle pubblicazioni");
      const data = await response.json();
      setPublications(data);
    } catch (err: any) {
      setError(err.message || "Errore nel caricamento delle pubblicazioni");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Devi essere loggato come admin!");
      setLoading(false);
      return;
    }

    try {
      const publicationData = { title, authors, year: parseInt(year), category, abstract };
      const addResponse = await fetch("/api/addPublications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(publicationData),
      });

      if (!addResponse.ok) {
        const errorData = await addResponse.json();
        throw new Error(errorData.error || "Errore nel salvataggio dei dati testuali");
      }

      const addResult = await addResponse.json();
      const publicationId = addResult.publication_id;

      if (file) {
        const formData = new FormData();
        formData.append("publication_id", publicationId.toString());
        formData.append("file", file);

        const uploadResponse = await fetch("/api/uploadFile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Errore nel caricamento del file");
        }

        await uploadResponse.json();
      }

      alert("Pubblicazione caricata con successo!");
      setTitle("");
      setAuthors("");
      setYear("");
      setCategory("");
      setAbstract("");
      setFile(null);
      fetchPublications();
    } catch (err: any) {
      setError(err.message || "Errore nel caricamento della pubblicazione");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (publicationId: number) => {
    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Devi essere loggato come admin!");
      setLoading(false);
      return;
    }

    if (!confirm("Sei sicuro di voler eliminare questa pubblicazione?")) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/deletePublication?id=${publicationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore nell'eliminazione della pubblicazione");
      }

      const result = await response.json();
      alert(result.message);
      fetchPublications();
    } catch (err: any) {
      setError(err.message || "Errore nell'eliminazione della pubblicazione");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (pub: any) => {
    setEditPublication(pub);
    setEditTitle(pub.title);
    setEditAuthors(pub.authors);
    setEditYear(pub.year.toString());
    setEditCategory(pub.category);
    setEditAbstract(pub.abstract);
    setEditFile(null);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditPublication(null);
    setEditTitle("");
    setEditAuthors("");
    setEditYear("");
    setEditCategory("");
    setEditAbstract("");
    setEditFile(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Devi essere loggato come admin!");
      setLoading(false);
      return;
    }

    try {
      const publicationData = {
        title: editTitle,
        authors: editAuthors,
        year: parseInt(editYear),
        category: editCategory,
        abstract: editAbstract,
      };
      const updateResponse = await fetch(`/api/updatePublication?id=${editPublication.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(publicationData),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.error || "Errore nell'aggiornamento dei dati testuali");
      }

      if (editFile) {
        const formData = new FormData();
        formData.append("file", editFile);

        // Modificato per usare query parameter
        const updateFileResponse = await fetch(`/api/updatePublicationFile?id=${editPublication.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!updateFileResponse.ok) {
          const errorData = await updateFileResponse.json();
          throw new Error(errorData.error || "Errore nell'aggiornamento del file");
        }
      }

      alert("Pubblicazione aggiornata con successo!");
      closeEditModal();
      fetchPublications();
    } catch (err: any) {
      setError(err.message || "Errore nell'aggiornamento della pubblicazione");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Devi essere loggato come admin!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/export?format=${exportFormat}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante l'esportazione");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `publications.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || "Errore durante l'esportazione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Pannello di Amministrazione
        </h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Aggiungi Nuova Pubblicazione
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Titolo</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Inserisci il titolo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Autori</label>
                <input
                  type="text"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  required
                  className="mt-1 w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Inserisci gli autori"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Anno</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="mt-1 w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Inserisci l'anno"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Categoria</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="mt-1 w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Inserisci la categoria"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Abstract</label>
              <textarea
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                required
                className="mt-1 w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={4}
                placeholder="Inserisci l'abstract"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">File PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                className="mt-1 w-full p-2 border text-black rounded-md"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Caricamento..." : "Aggiungi Pubblicazione"}
            </button>
          </form>
        </div>

        {/* Sezione per l'esportazione */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Esporta Pubblicazioni
          </h2>
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Formato</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="mt-1 p-2 border rounded-md focus:ring-2 text-black focus:ring-blue-500 focus:outline-none"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <button
              onClick={handleExport}
              disabled={loading}
              className={`bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors flex items-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaDownload className="mr-2" />
              {loading ? "Esportazione..." : "Esporta"}
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Elenco delle Pubblicazioni
          </h2>
          {loading ? (
            <p className="text-gray-500">Caricamento...</p>
          ) : publications.length === 0 ? (
            <p className="text-gray-500">Nessuna pubblicazione disponibile.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Titolo</th>
                    <th className="py-3 px-6 text-left">Autori</th>
                    <th className="py-3 px-6 text-center">Anno</th>
                    <th className="py-3 px-6 text-left">Categoria</th>
                    <th className="py-3 px-6 text-left">Abstract</th>
                    <th className="py-3 px-6 text-center">PDF</th>
                    <th className="py-3 px-6 text-center">Azioni</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {publications.map((pub) => (
                    <tr
                      key={pub.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {pub.title}
                      </td>
                      <td className="py-3 px-6 text-left">{pub.authors}</td>
                      <td className="py-3 px-6 text-center">{pub.year}</td>
                      <td className="py-3 px-6 text-left">{pub.category}</td>
                      <td className="py-3 px-6 text-left">
                        {pub.abstract.length > 100
                          ? `${pub.abstract.substring(0, 100)}...`
                          : pub.abstract}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {pub.link ? (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            <FaFilePdf className="inline mr-1" /> Scarica
                          </a>
                        ) : (
                          "Nessun PDF"
                        )}
                      </td>
                      <td className="py-3 px-6 text-center space-x-2">
                        <button
                          onClick={() => openEditModal(pub)}
                          disabled={loading}
                          className="text-blue-500 hover:text-blue-700"
                          title="Modifica pubblicazione"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(pub.id)}
                          disabled={loading}
                          className="text-red-500 hover:text-red-700"
                          title="Elimina pubblicazione"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal per la modifica */}
        {editModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Modifica Pubblicazione
              </h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Titolo</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                      className="mt-1 w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Autori</label>
                    <input
                      type="text"
                      value={editAuthors}
                      onChange={(e) => setEditAuthors(e.target.value)}
                      required
                      className="mt-1 w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Anno</label>
                    <input
                      type="number"
                      value={editYear}
                      onChange={(e) => setEditYear(e.target.value)}
                      required
                      className="mt-1 w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Categoria</label>
                    <input
                      type="text"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      required
                      className="mt-1 w-full p-2 border rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Abstract</label>
                  <textarea
                    value={editAbstract}
                    onChange={(e) => setEditAbstract(e.target.value)}
                    required
                    className="mt-1 w-full p-2 border text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nuovo File PDF (opzionale)</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                    className="mt-1 w-full p-2 text-black border rounded-md"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Aggiornamento..." : "Salva Modifiche"}
                  </button>
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Annulla
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}