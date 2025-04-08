"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

interface LoginModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function LoginModal({ open, setOpen }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Simulazione vulnerabile a SQL Injection
    if (username === "' OR '1'='1" || password === "' OR '1'='1") {
      alert("Login bypassato con successo!");
      setOpen(false);
      router.push("/progetti");
    } else {
      alert("Credenziali errate!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accedi per vedere i progetti</DialogTitle>
          <p> No, non sei registrato! Ma se sei un buon informatico devi accedere comunque!🤪</p>
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