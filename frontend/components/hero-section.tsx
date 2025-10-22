"use client"

import { ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function HeroSection() {
  // Movie poster images for the carousel
  const posters = [
    "/images/inception.jpg",
    "/images/interstellar.jpg",
    "/images/dark-knight.jpg",
    "/images/avatar.jpg",
    "/images/parasite.jpg",
  ]
  const [index, setIndex] = useState(0)
  const movieListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % posters.length)
    }, 3500)
    return () => clearTimeout(timer)
  }, [index, posters.length])

  const handleExploreClick = () => {
    if (movieListRef.current) {
      const y = movieListRef.current.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  // Particle animation data
  const particles = Array.from({ length: 12 }, (_, i) => ({
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 80 + 10}%`,
    delay: Math.random() * 2,
    size: Math.random() * 18 + 12,
  }))

  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Cinematic blurred carousel background with Ken Burns effect */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false}>
          <motion.img
            key={posters[index]}
            src={posters[index]}
            alt="Movie Advertisement"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.14 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center blur-lg"
            style={{ zIndex: 1, transition: "transform 3.5s cubic-bezier(.4,0,.2,1)" }}
          />
        </AnimatePresence>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0A1F]/90 via-[#1E1B4B]/80 to-[#2A1A5E]/80" style={{zIndex:2}} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F0A1F]/95" style={{zIndex:3}} />
        {/* Animated floating particles */}
        {particles.map((p, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 0.7, y: [0, -20, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-accent/40 blur-lg"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              zIndex: 4,
            }}
          />
        ))}
      </div>

      {/* Animated purple glows */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{zIndex:4}} />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{zIndex:4}} />

      {/* Hero Content */}
      <div className="relative min-h-[600px] flex items-center" style={{zIndex:5}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-semibold text-foreground">Premium Cinema Experience</span>
            </div>

            {/* Glowing animated headline */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-[0_0_16px_#A78BFA99]"
              initial={{ textShadow: "0 0 0px #A78BFA" }}
              animate={{
                textShadow: [
                  "0 0 16px #A78BFA99, 0 0 32px #5B21B6AA",
                  "0 0 32px #A78BFA, 0 0 48px #7C3AEDAA",
                  "0 0 16px #A78BFA99, 0 0 32px #5B21B6AA",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
            >
              Experience Cinema Like{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-text">
                Never Before
              </span>
            </motion.h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Book your favorite movies, choose your premium seats, and enjoy an unforgettable experience.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                className="group bg-gradient-to-r from-primary to-accent text-white px-8 py-6 text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105 rounded-2xl"
                onClick={handleExploreClick}
              >
                Explore Now
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/30 backdrop-blur-sm bg-white/5 text-foreground hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20 hover:border-primary px-8 py-6 text-lg transition-all duration-300 hover:scale-105 rounded-2xl"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Movie list anchor for scroll */}
      <div ref={movieListRef} />
    </section>
  )
}
