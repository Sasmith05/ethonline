"use client";
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Star } from "lucide-react";
import BackButton from "@/components/BackButton";
import { MovieContext } from "@/components/MovieProvider";

export default function ExplorePage() {
	const listRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const movieCtx = useContext(MovieContext);
	const movies = movieCtx?.movies || [];

	const [search, setSearch] = useState("");

	const filteredMovies = movies.filter(
		(m) =>
			m.title.toLowerCase().includes(search.toLowerCase()) ||
			(m.genre && m.genre.toLowerCase().includes(search.toLowerCase()))
	);

	// Scroll to movie list if hash or state is set
	return (
		<main className="relative min-h-screen bg-gradient-to-br from-[#0B001A] via-[#12002A] to-[#7C3AED] pb-12 font-poppins">
			{/* Cinematic Gradient & Particles */}
			<motion.div
				className="absolute inset-0 z-0"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				style={{
					background:
						"radial-gradient(ellipse 80% 60% at 50% 20%, #7C3AED33 0%, transparent 100%)",
				}}
			/>
			{/* Floating Particles */}
			<motion.div
				className="absolute inset-0 pointer-events-none"
				animate={{
					backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
				}}
				transition={{ duration: 20, repeat: Infinity }}
				style={{
					background:
						"repeating-radial-gradient(circle at 20% 40%, #9D4EDD22 0, #7C3AED11 2px, transparent 6px 100px)",
				}}
			/>

			{/* Back Button */}
			<BackButton />

			{/* Search Bar */}
			<motion.div
				className="mx-auto max-w-xl pt-16 pb-8 flex justify-center"
				initial={{ y: -40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 120, damping: 18 }}
			>
				<div className="relative w-full">
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search for movies or theatres..."
						className="w-full px-6 py-4 rounded-2xl bg-white/10 text-white text-lg font-medium border-2 border-transparent focus:border-accent focus:shadow-[0_0_20px_#7C3AED] transition-all outline-none font-poppins backdrop-blur-lg"
					/>
					<Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-accent/80" />
				</div>
			</motion.div>

			{/* Movie Grid */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
					{filteredMovies.map((movie, idx) => (
						<motion.div
							key={movie.id}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							whileHover={{
								scale: 1.05,
								rotateY: 3,
								rotateX: -2,
								boxShadow: "0 0 32px #7C3AED",
							}}
							transition={{ type: "spring", stiffness: 180, damping: 18 }}
							className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border-2 border-accent/30 shadow-[0_0_20px_#7CAED] transition-all duration-300 cursor-pointer group relative"
						>
							<img
								src={movie.image}
								alt={movie.title}
								className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
							/>
							<div className="p-6">
								<h2 className="text-2xl font-semibold text-white mb-2 font-poppins drop-shadow-lg">
									{movie.title}
								</h2>
								<div className="flex items-center gap-2 text-accent mb-1">
									<span className="font-semibold text-white text-base">
										{movie.genre}
									</span>
									<Star className="w-5 h-5 text-accent" />
									<span className="font-semibold text-white">
										{movie.rating}
									</span>
								</div>
								<button
									className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-accent to-primary text-white font-semibold text-lg shadow-lg hover:shadow-[0_0_30px_#9D4EDD] hover:scale-105 transition-all duration-300 font-poppins"
									onClick={() => router.push(`/booking/${movie.id}`)}
								>
									Book Now
								</button>
							</div>
						</motion.div>
					))}
				</div>
				{filteredMovies.length === 0 && (
					<div className="text-center text-accent/70 py-16 text-xl font-poppins">
						No movies found.
					</div>
				)}
			</div>
		</main>
	);
}
