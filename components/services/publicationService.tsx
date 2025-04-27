export interface Publication {
    id: number;
    title: string;
    authors: string;
    year: number;
    category: string;
    abstract: string;
    link: string;
  }
  
  export interface PublicationService {
    getPublications(): Promise<Publication[]>;
  }
  
  // Implementazione fake (dati statici)
  export class FakePublicationService implements PublicationService {
    async getPublications(): Promise<Publication[]> {
      return [
        {
          id: 1,
          title: "Analisi Avanzata dei Malware Moderni",
          authors: "Mario Rossi, Laura Bianchi",
          year: 2023,
          category: "Malware",
          abstract: "Uno studio approfondito sulle tecniche di reverse engineering.",
          link: "/pdf/malware-2023.pdf",
        },
        {
          id: 2,
          title: "Sicurezza delle Infrastrutture Critiche",
          authors: "Anna Verdi, Marco Neri",
          year: 2022,
          category: "Pentesting",
          abstract: "Un’analisi dei metodi di pentesting.",
          link: "/pdf/infrastrutture-2022.pdf",
        },
      ];
    }
  }
  
  // Implementazione reale (chiama il backend)
  export class ApiPublicationService implements PublicationService {
    async getPublications(): Promise<Publication[]> {
      console.log("ciao")
      const token = localStorage.getItem("token"); // Recupera il token se presente
      const response = await fetch("/api/publications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || ""}`, // Passa il token 
        },
      });
      if (!response.ok) throw new Error("Errore nel recupero delle pubblicazioni");
      return response.json();
    }
  }