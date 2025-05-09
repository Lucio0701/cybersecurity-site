// components/Footer.tsx
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Luciano Emanuele Chiappetta. Tutti i diritti riservati.</p>
        <div className="flex space-x-4 text-xl">
          <a href="https://github.com/Lucio0701" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/luciano-emanuele-chiappetta" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="mailto:lucianochiappetta1@gmail.com">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
