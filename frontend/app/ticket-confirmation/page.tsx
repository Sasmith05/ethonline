"use client";
import { motion } from "framer-motion";
import { Home, Ticket } from "lucide-react";
import OutlinedIconButton from "@/components/OutlinedIconButton";
import TicketCard from "@/components/TicketCard";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function TicketConfirmation() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#12002A] via-[#5B21B6] to-[#7C3AED]">
      {/* Animated background light */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ background: "radial-gradient(ellipse at 60% 40%, #A78BFA33 0%, transparent 70%)" }}
      />
      <BackButton />
      <motion.div
        className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center pt-24"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        {/* Success message and ticket card */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-white mb-6 text-center font-poppins drop-shadow-[0_0_16px_#A78BFA99]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Your Ticket Has Been Successfully Booked!
        </motion.h1>
        <TicketCard />
        <div className="mt-8 text-center text-white/80 text-base font-poppins">
          Your real ticket with QR code will be available 20 minutes before the show.<br />
          Token ID: <span className="font-bold text-accent">#CINE24876</span>
        </div>
        {/* Floating bar for navigation icons */}
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-12 bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-accent/30 shadow-[0_0_30px_#7C3AED]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.12, boxShadow: "0 0 24px #7C3AED", filter: "brightness(1.2)" }}
                className="flex flex-col items-center text-accent hover:text-primary focus:outline-none"
                onClick={() => router.push("/home")}
              >
                <Home className="w-8 h-8 mb-1" />
                <span className="text-xs font-poppins">Home</span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>Go to Home</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.12, boxShadow: "0 0 24px #7C3AED", filter: "brightness(1.2)" }}
                className="flex flex-col items-center text-accent hover:text-primary focus:outline-none"
                onClick={() => router.push("/bookings")}
              >
                <Ticket className="w-8 h-8 mb-1" />
                <span className="text-xs font-poppins">My Bookings</span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>View My Bookings</TooltipContent>
          </Tooltip>
        </motion.div>
      </motion.div>
      <footer className="fixed bottom-0 left-0 right-0 z-10 pb-6 pt-4 text-center text-white/80 text-sm bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm font-poppins">
  © 2025 FlimX. All Rights Reserved.
      </footer>
    </div>
  );
}
