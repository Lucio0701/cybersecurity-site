"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginVeroProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function LoginVero({ open, setOpen }: LoginVeroProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }).toString(),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.access_token); // Salva il token
      alert("Login riuscito!");
      setOpen(false);
      router.push("/admin"); // Reindirizza all’admin
    } else {
      alert("Credenziali errate!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accedi come Admin</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}