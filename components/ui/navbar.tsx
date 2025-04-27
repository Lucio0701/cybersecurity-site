"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginModal from "./loginModal";
import LoginVero from "./loginVero";
import { useRouter } from "next/navigation";
import { Cpu } from "lucide-react";
import Image from "next/image";

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
    <nav className="relative w-full bg-black bg-opacity-95 border-b border-green-500 p-4 font-mono z-50">
      <style>
        {`
          .nav-button {
            position: relative;
            color: #00ff88;
            transition: all 1s ease-in-out;
          }
          .nav-button::after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0%;
            height: 2px;
            background: #00ff88;
            transition: width 0.3s ease;
          }
          .nav-button:hover::after {
            width: 100%;
          }

          @keyframes pulse-smooth {
            0%, 100% { transform: scale(1); opacity: 1 }
            50% { transform: scale(1.1); opacity: 0.7 }
          }

          .animate-smooth-pulse {
            animation: pulse-smooth 2s infinite;
          }
        `}
      </style>

      {/* LOGO a sinistra */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
        <Image
          src="/logo.png" 
          alt="UNICAL Cybersecurity"
          width={40}
          height={40}
        />
        <h1 className="text-xl md:text-2xl font-bold text-green-400 tracking-wider hidden sm:block">
          CyberLab
        </h1>
      </div>

      {/* NAV LINKS */}
      <div className="flex justify-center gap-3 text-sm">
        <Link href="/"><Button variant="ghost" className="nav-button">Home</Button></Link>
        <Link href="/chi-siamo"><Button variant="ghost" className="nav-button">Chi siamo</Button></Link>
        <Link href="/progetti"><Button variant="ghost" className="nav-button">Progetti</Button></Link>
        <Link href="/pubblicazioni"><Button variant="ghost" className="nav-button">Pubblicazioni</Button></Link>
        <Button variant="ghost" onClick={() => setIsModalOpen(true)} className="nav-button">Contatti</Button>

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

      {/* Chip animato */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Cpu className="w-5 h-5 text-green-400 animate-smooth-pulse" />
      </div>

      {/* Modali */}
      <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
      <LoginVero open={isLoginVeroOpen} setOpen={setIsLoginVeroOpen} onSuccess={() => setIsAdmin(true)} />
    </nav>
  );
}
