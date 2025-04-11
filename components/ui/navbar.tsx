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

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-tuggle";
import LoginModal from "./loginModal";
import LoginVero from "./loginVero";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Progetti (SQLi)
  const [isLoginVeroOpen, setIsLoginVeroOpen] = useState(false); // Login Admin
  const [isAdmin, setIsAdmin] = useState(false); // Stato login persistente
  const router = useRouter();

  // Controlla localStorage al primo render
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("isAdmin");
    if (adminLoggedIn === "true") {
      setIsAdmin(true);
    }
  }, []);

  // Funzione di logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    router.push("/");
  };

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

        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Progetti
        </Button>

        <Link href="/pubblicazioni">
          <Button variant="outline">Pubblicazioni</Button>
        </Link>
        <Link href="/contatti">
          <Button variant="outline">Contatti</Button>
        </Link>

        {/* Se loggato mostra Area Admin e Logout, altrimenti il Login */}
        {isAdmin ? (
          <>
            <Link href="/admin">
              <Button variant="default">Area Admin</Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={() => setIsLoginVeroOpen(true)}>
            Login Admin
          </Button>
        )}
      </div>

      <ThemeToggle />

      {/* Modali */}
      <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
      <LoginVero
        open={isLoginVeroOpen}
        setOpen={setIsLoginVeroOpen}
        onSuccess={() => setIsAdmin(true)} // facciamo callback quando loggato
      />
    </nav>
  );
}
