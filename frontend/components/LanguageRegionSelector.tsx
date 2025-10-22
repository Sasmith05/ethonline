"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe2, MapPin } from "lucide-react";

const languages = [
  { value: "en", label: "English", icon: "🇬🇧" },
  { value: "ta", label: "Tamil", icon: "🇮🇳" },
  { value: "hi", label: "Hindi", icon: "🇮🇳" },
  { value: "te", label: "Telugu", icon: "🇮🇳" },
  { value: "kn", label: "Kannada", icon: "🇮🇳" },
  { value: "ml", label: "Malayalam", icon: "🇮🇳" },
  { value: "bn", label: "Bengali", icon: "🇮🇳" },
  { value: "mr", label: "Marathi", icon: "🇮🇳" },
];

const regions = [
  { value: "india", label: "India", icon: "🇮🇳" },
  { value: "chennai", label: "Chennai", icon: "" },
  { value: "bangalore", label: "Bangalore", icon: "" },
  { value: "hyderabad", label: "Hyderabad", icon: "" },
  { value: "mumbai", label: "Mumbai", icon: "" },
  { value: "delhi", label: "Delhi", icon: "" },
  { value: "kolkata", label: "Kolkata", icon: "" },
  { value: "pune", label: "Pune", icon: "" },
  { value: "kerala", label: "Kerala", icon: "" },
  { value: "other", label: "Other", icon: "" },
];

export default function LanguageRegionSelector() {
  const [language, setLanguage] = useState("en");
  const [region, setRegion] = useState("india");
  const [openLang, setOpenLang] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="fixed bottom-6 left-6 z-40 flex flex-col gap-6 items-start"
      style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
    >
      {/* Language Selector */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="w-56 rounded-2xl bg-gradient-to-br from-[#5B21B6]/80 to-[#7C3AED]/80 shadow-xl border border-[#5B21B6]/40 px-5 py-4 mb-2 flex items-center gap-3 cursor-pointer"
        onClick={() => setOpenLang((v) => !v)}
      >
        <Globe2 className="w-6 h-6 text-white/80" />
        <span className="text-white font-semibold text-base flex-1 transition-transform duration-200">
          {languages.find(l => l.value === language)?.label} {languages.find(l => l.value === language)?.icon}
        </span>
        <span className="text-white/60 text-xs">▼</span>
      </motion.div>
      {openLang && (
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="w-56 rounded-2xl bg-[#1E1B4B]/95 shadow-lg border border-[#5B21B6]/30 py-2 absolute left-0 bottom-24"
        >
          {languages.map(l => (
            <li
              key={l.value}
              onClick={() => { setLanguage(l.value); setOpenLang(false); }}
              className="flex items-center gap-2 px-5 py-2 text-white/90 font-medium cursor-pointer hover:bg-[#7C3AED]/30 hover:text-white transition-all rounded-xl"
            >
              <span className="text-lg">{l.icon}</span>
              <span className="flex-1">{l.label}</span>
            </li>
          ))}
        </motion.ul>
      )}
      {/* Region Selector */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="w-56 rounded-2xl bg-gradient-to-br from-[#5B21B6]/80 to-[#7C3AED]/80 shadow-xl border border-[#5B21B6]/40 px-5 py-4 flex items-center gap-3 cursor-pointer"
        onClick={() => setOpenRegion((v) => !v)}
      >
        <MapPin className="w-6 h-6 text-white/80" />
        <span className="text-white font-semibold text-base flex-1 transition-transform duration-200">
          {regions.find(r => r.value === region)?.label} {regions.find(r => r.value === region)?.icon}
        </span>
        <span className="text-white/60 text-xs">▼</span>
      </motion.div>
      {openRegion && (
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="w-56 rounded-2xl bg-[#1E1B4B]/95 shadow-lg border border-[#5B21B6]/30 py-2 absolute left-0 bottom-0"
        >
          {regions.map(r => (
            <li
              key={r.value}
              onClick={() => { setRegion(r.value); setOpenRegion(false); }}
              className="flex items-center gap-2 px-5 py-2 text-white/90 font-medium cursor-pointer hover:bg-[#7C3AED]/30 hover:text-white transition-all rounded-xl"
            >
              <span className="flex-1">{r.label}</span>
              <span className="text-lg">{r.icon}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
