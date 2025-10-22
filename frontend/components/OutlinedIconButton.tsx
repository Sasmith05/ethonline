import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export default function OutlinedIconButton({
  icon: Icon,
  label,
  onClick,
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, boxShadow: "0 0 12px #A78BFA" }}
      className={`flex items-center justify-center rounded-2xl border-2 border-accent bg-transparent text-accent hover:text-white hover:bg-accent/20 transition-all duration-200 shadow-lg group relative ${className}`}
      aria-label={label}
    >
      <Icon className="w-6 h-6 stroke-2" />
      <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none transition-all duration-200 font-poppins">
        {label}
      </span>
    </motion.button>
  );
}
