import { motion } from "framer-motion";

export default function TicketCard({
  movie = "Inception",
  date = "2025-10-25",
  time = "7:00 PM",
  seat = "A12",
  token = "#CINE7345",
}: {
  movie?: string;
  date?: string;
  time?: string;
  seat?: string;
  token?: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="w-full max-w-md mx-auto rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl p-8 flex flex-col items-center border-2 border-accent/40 relative overflow-hidden"
      style={{ boxShadow: "0 0 32px #A78BFA55" }}
    >
      <div className="w-full flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-sm font-poppins">Movie</span>
          <span className="text-white font-semibold font-poppins">{movie}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-sm font-poppins">Date</span>
          <span className="text-white font-semibold font-poppins">{date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-sm font-poppins">Time</span>
          <span className="text-white font-semibold font-poppins">{time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-sm font-poppins">Seat</span>
          <span className="text-white font-semibold font-poppins">{seat}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-sm font-poppins">Token</span>
          <span className="text-accent font-bold font-poppins">{token}</span>
        </div>
      </div>
      <div className="w-full text-center text-white/70 text-xs mt-2 font-poppins">
        Your real ticket with QR code will be available 20 minutes before the show.
      </div>
    </motion.div>
  );
}
