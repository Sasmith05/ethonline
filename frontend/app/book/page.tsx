"use client"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import MovieGrid from "@/components/movie-grid"
import BookingModal from "@/components/booking-modal"
import { useState, useContext } from "react"
import { MovieContext } from "@/components/MovieProvider"
import type { Movie } from "@/components/MovieProvider"
import { WalletContext } from "@/components/WalletProvider"

export default function BookPage() {
  const movieCtx = useContext(MovieContext)
  const wallet = useContext(WalletContext)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  if (!movieCtx) return null
  const { movies } = movieCtx

  const handleBookMovie = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsBookingOpen(true)
  }

  if (!wallet?.address) {
    return (
      <main className="min-h-dvh flex items-center justify-center p-8 text-center bg-gradient-to-b from-background via-gray-900 to-background">
        <div className="animate-fade-in-up">
          <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Connect your wallet</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Please connect your MetaMask wallet to continue booking tickets and enjoy premium cinema experience.</p>
          <button
            onClick={() => wallet?.connect()}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-white px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
            disabled={wallet?.isConnecting}
          >
            {wallet?.isConnecting ? 'Connecting…' : 'Connect MetaMask'}
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
  <HeroSection />
  <MovieGrid onBookMovie={handleBookMovie} movies={movies} />
      {selectedMovie && (
        <BookingModal movie={selectedMovie} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      )}
    </main>
  )
}
