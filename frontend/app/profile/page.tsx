"use client";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useContext } from "react";
import { WalletContext } from "@/components/WalletProvider";

export default function ProfilePage() {
  const wallet = useContext(WalletContext);
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1E003D] via-[#2A1A5E] to-[#7C3AED] flex items-center justify-center p-6">
      <BackButton />
      <motion.div
        className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        <div className="mb-6 flex flex-col items-center">
          <User className="w-16 h-16 text-accent mb-2" />
          {wallet?.address ? (
            <p className="text-white/80 text-lg mt-2">
              Wallet Address:
              <br />
              <span className="font-semibold text-accent break-all">
                {wallet.address}
              </span>
            </p>
          ) : (
            <p className="text-white/60 text-base mt-2">
              No wallet connected.
            </p>
          )}
        </div>
      </motion.div>
    </main>
  );
}
