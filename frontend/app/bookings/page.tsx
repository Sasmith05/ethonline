"use client";
import { motion } from "framer-motion";
import { Ticket, Calendar, CheckCircle } from "lucide-react";
import BackButton from "@/components/BackButton";

const bookings = [
	{
		movie: "Inception",
		date: "2025-10-25",
		time: "7:00 PM",
		seat: "A12",
		status: "upcoming",
	},
	{
		movie: "Interstellar",
		date: "2025-09-10",
		time: "8:45 PM",
		seat: "B7",
		status: "completed",
	},
];

export default function BookingsPage() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-[#1E003D] via-[#2A1A5E] to-[#7C3AED] flex items-center justify-center p-6">
			<BackButton />
			<motion.div
				className="max-w-lg w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 180, damping: 18 }}
			>
				<h1 className="text-2xl font-bold text-white mb-6 font-poppins">
					My Bookings
				</h1>
				<ul className="space-y-5">
					{bookings.map((b, i) => (
						<motion.li
							key={i}
							className="bg-white/10 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between shadow-sm backdrop-blur-sm border border-white/10"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.1 }}
						>
							<div className="flex items-center gap-4 mb-2 sm:mb-0">
								<Ticket className="w-8 h-8 text-accent" />
								<div>
									<div className="text-lg font-semibold text-white">
										{b.movie}
									</div>
									<div className="text-sm text-white/80 flex gap-2 items-center">
										<Calendar className="w-4 h-4" /> {b.date} • {b.time} •
										Seat {b.seat}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2">
								{b.status === "upcoming" ? (
									<span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold shadow-md animate-pulse">
										Upcoming
									</span>
								) : (
									<span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold border border-white/20">
										Completed
									</span>
								)}
								{b.status === "completed" && (
									<CheckCircle className="w-5 h-5 text-green-400" />
								)}
							</div>
						</motion.li>
					))}
				</ul>
			</motion.div>
		</main>
	);
}
