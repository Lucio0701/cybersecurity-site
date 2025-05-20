"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { QRCode } from "react-qrcode-logo";

interface LoginModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function LoginModal({ open, setOpen }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (username === "' OR '1'='1" || password === "' OR '1'='1") {
      alert("Login bypassato con successo!");
      setOpen(false);
      router.push("/contatti");
    } else {
      setAttempts((prev) => prev + 1); 
      alert("Credenziali errate!");
    }
  };

  const handleQRCodeAccess = () => {
    setOpen(false);
    router.push("/contatti");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accedi per contattarci!</DialogTitle>
          <p className="text-sm text-gray-500">
            No, non sei registrato! Ma se sei un buon informatico devi accedere comunque! 🤪
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button onClick={handleLogin}>Login</Button>
          </motion.div>

          {/* Mostra il suggerimento solo se tentativi >= 3 */}
          {attempts >= 3 && !showQR && (
            <motion.p
              className="text-xs text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Non mollare: <code>' OR '1'='1</code> ti dice qualcosa? Oppure...
            </motion.p>
          )}

          {/* Mostra il link per QR solo se non è ancora visibile */}
          {!showQR ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="link"
                className="text-xs underline text-gray-500 hover:text-blue-600"
                onClick={() => setShowQR(true)}
              >
                Non sei un hacker? Scansiona questo
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm text-center mb-2">
                Ecco il tuo pass per accedere 👀
              </p>
              <QRCode value="http://localhost:3000/contatti" size={128} />
              <p className="text-xs text-gray-500 mt-2">Scansiona o clicca qui sotto ↓</p>
              <Button variant="outline" onClick={handleQRCodeAccess}>
                Contattaci
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
