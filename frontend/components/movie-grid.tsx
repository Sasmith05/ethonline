"use client"

import { Star, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type Movie = {
  id: number;
  title: string;
  showtimes?: string[];
  rating?: number;
  duration?: string;
  genre?: string;
  image?: string;
  price?: string;
  badge?: string;
  ageRating?: '16+' | '18+';
};

type MovieGridProps = {
  onBookMovie: (movie: Movie) => void;
  movies: Movie[];
};

export default function MovieGrid({ onBookMovie, movies }: MovieGridProps) {
  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const featuredMovies = movies.slice(0, 5);

  // Auto-advance carousel
  useEffect(() => {
    if (featuredMovies.length < 2) return;
    const timer = setTimeout(() => {
      setCarouselIndex((i) => (i + 1) % featuredMovies.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [carouselIndex, featuredMovies.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Featured Movie Carousel */}
        {featuredMovies.length > 0 && (
          <div className="mb-16 flex flex-col items-center">
            <div className="relative w-full max-w-2xl h-80 mb-8">
              {featuredMovies.map((movie, idx) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: idx === carouselIndex ? 1 : 0, scale: idx === carouselIndex ? 1 : 0.95 }}
                  transition={{ duration: 0.7, type: "spring" }}
                  className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/30 ${idx === carouselIndex ? "z-10" : "z-0 pointer-events-none"}`}
                  style={{
                    boxShadow: idx === carouselIndex ? "0 0 60px 10px rgba(168,85,247,0.25)" : "none",
                  }}
                >
                  <img
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-primary/10 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">{movie.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-accent text-accent" />{movie.rating}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{movie.duration}</span>
                      <span className="px-2 py-1 bg-primary/30 rounded-full text-xs font-semibold">{movie.genre}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Carousel indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredMovies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`w-3 h-3 rounded-full border-2 border-primary/40 ${carouselIndex === idx ? "bg-accent shadow-[0_0_10px_rgba(199,125,255,0.7)]" : "bg-white/10"}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Now Showing</h2>
            <p className="text-muted-foreground text-lg">Discover the latest blockbusters and exclusive releases</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies && movies.length > 0 ? movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="group relative bg-card/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500 pointer-events-none" />

              <div className="relative h-72 overflow-hidden bg-secondary">
                <img
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {movie.badge && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full backdrop-blur-sm animate-pulse">
                    {movie.badge}
                  </div>
                )}
              </div>

              <div className="p-6 relative z-10">
                <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">{movie.title}</h3>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-foreground font-semibold">{movie.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    {movie.genre && (
                      <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-primary rounded-full text-xs font-semibold border border-white/10 hover:bg-white/20 transition-colors">
                        {movie.genre}
                      </span>
                    )}
                    {movie.ageRating && (
                      <span className="inline-block px-2 py-1 bg-white/10 backdrop-blur-sm text-foreground rounded-full text-[10px] font-bold border border-white/10">
                        {movie.ageRating}
                      </span>
                    )}
                  </div>
                  <span className="text-accent font-bold text-lg">{movie.price}</span>
                </div>

                <Button
                  onClick={() => onBookMovie(movie)}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <Zap className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  Book Now
                </Button>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center text-muted-foreground py-12">No movies available.</div>
          )}
        </div>
      </div>
    </section>
  )
}
