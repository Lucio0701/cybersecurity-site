/*"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ThemeToggle } from "./theme-tuggle";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="w-full bg-gray-900 bg-gray-900 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">Cybersecurity Lab</h1>

      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline">Home</Button>
        </Link>
        <Link href="chi-siamo">
          <Button variant="outline">Chi siamo</Button>
        </Link>
        <Link href="/progetti">
          <Button variant="outline">Progetti</Button>
        </Link>
        <Link href="/pubblicazioni">
          <Button variant="outline">Pubblicazioni</Button>
        </Link>
        <Link href="contatti">
          <Button variant="outline">Contatti</Button>
        </Link>
      </div>
      
        <ThemeToggle />
    </nav>
  );
}*/
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ThemeToggle } from "./theme-tuggle";
import LoginModal from "./loginModal"; // Importa il componente LoginModal
import LoginVero from "./loginVero";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per la vulnerabilità a SQL Injection
  const [isLoginVeroOpen, setIsLoginVeroOpen] = useState(false); // Per l’autenticazione reale

  return (
    <nav className="w-full bg-gray-900 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold text-white">Cybersecurity Lab</h1>

      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline">Home</Button>
        </Link>
        <Link href="/chi-siamo">
          <Button variant="outline">Chi siamo</Button>
        </Link>
        {/* Sostituiamo il Link con un Button che apre il modale */}
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Progetti
        </Button>
        <Link href="pubblicazioni">
          <Button variant="outline">Pubblicazioni</Button>
        </Link>
        <Link href="/contatti">
          <Button variant="outline">Contatti</Button>
        </Link>
        <Button variant="outline" onClick={() => setIsLoginVeroOpen(true)} >
            Login Admin
          </Button>
      </div>

      <ThemeToggle />

      {/* Aggiungiamo il LoginModal */}
      <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />

      <LoginVero open={isLoginVeroOpen} setOpen={setIsLoginVeroOpen} />
    </nav>
  );
}
