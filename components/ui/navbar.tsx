"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginModal from "./loginModal";
import LoginVero from "./loginVero";
import { useRouter } from "next/navigation";
import { Cpu } from "lucide-react";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginVeroOpen, setIsLoginVeroOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("isAdmin");
    if (adminLoggedIn === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    router.push("/");
  };


  return (
    <nav className="relative w-full bg-black bg-opacity-90 border-b border-green-600 p-4 shadow-[0_0_15px_#00ff88] font-mono z-50">
      {/* LOGO con effetto glitch */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <h1 className="text-xl md:text-2xl font-bold text-green-400 glitch-text relative z-10">
          &gt; CyberLab
        </h1>
      </div>

      {/* NAV LINKS */}
      <div className="flex justify-center gap-3 text-sm">
        <Link href="/"><Button variant="ghost"  className="glitch-button">Home</Button></Link>
        <Link href="/chi-siamo"><Button variant="ghost" className="glitch-button">Chi siamo</Button></Link>
        <Link href="/progetti"><Button variant="ghost"  className="glitch-button">Progetti</Button></Link>
        <Link href="/pubblicazioni"><Button variant="ghost"  className="glitch-button">Pubblicazioni</Button></Link>
        <Button variant="ghost" onClick={() => setIsModalOpen(true)} className="glitch-button">Contatti</Button>

        {isAdmin ? (
          <>
            <Link href="/admin">
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-800 hover:text-white">Admin</Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout} className="bg-red-600 hover:bg-red-800 text-white">Logout</Button>
          </>
        ) : (
          <Button variant="outline" onClick={() => setIsLoginVeroOpen(true)} className="border-green-500 text-green-400 hover:bg-green-800 hover:text-white">Login Admin</Button>
        )}
      </div>

      {/* CHIP FUTURISTICO */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Cpu className="w-6 h-6 text-green-400 animate-pulse" />
      </div>

      {/* Modali */}
      <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
      <LoginVero open={isLoginVeroOpen} setOpen={setIsLoginVeroOpen} onSuccess={() => setIsAdmin(true)} />
    </nav>
  );
}
