"use client";
import { motion } from "framer-motion";
import { Gift, Percent } from "lucide-react";
import BackButton from "@/components/BackButton";

const offers = [
	{
		code: "CINE10",
		desc: "Get 10% off on your next booking!",
	},
	{
		code: "PURPLE20",
		desc: "20% off for all purple-themed movies this month.",
	},
];

export default function OffersPage() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-[#1E003D] via-[#2A1A5E] to-[#7C3AED] flex items-center justify-center p-6">
			<BackButton />
			<motion.div
				className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 180, damping: 18 }}
			>
				<h1 className="text-2xl font-bold text-white mb-6 font-poppins">
					Offers & Coupons
				</h1>
				<ul className="space-y-5">
					{offers.map((o, i) => (
						<motion.li
							key={i}
							className="bg-white/10 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm backdrop-blur-sm border border-white/10"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.1 }}
						>
							<Gift className="w-8 h-8 text-accent animate-bounce" />
							<div>
								<div className="text-lg font-semibold text-white">
									{o.code}
								</div>
								<div className="text-sm text-white/80 flex gap-2 items-center">
									<Percent className="w-4 h-4" /> {o.desc}
								</div>
							</div>
						</motion.li>
					))}
				</ul>
			</motion.div>
		</main>
	);
}
