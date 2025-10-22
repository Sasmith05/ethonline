"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  return (
    <motion.button
      onClick={() => router.back()}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.08, boxShadow: "0 0 12px #A78BFA" }}
      className={`fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-accent bg-white/5 backdrop-blur-md text-accent hover:text-white hover:bg-accent/20 transition-all duration-200 shadow-lg group ${className}`}
      aria-label="Go Back"
    >
      <ArrowLeft className="w-6 h-6 stroke-2" />
      <span className="sr-only">Back</span>
    </motion.button>
  );
}
