"use client"
import React, { useMemo, useState, useContext } from "react"
import { MovieContext, type Movie } from "@/components/MovieProvider"
import { motion } from "framer-motion"
import { Film, Edit, DollarSign, Ticket, LogOut, Search } from "lucide-react"
import BackButton from "@/components/BackButton"

export default function AdminPage() {
  const movieCtx = useContext(MovieContext)
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("$12.99")
  const [genre, setGenre] = useState("")
  const [duration, setDuration] = useState("")
  const [ageRating, setAgeRating] = useState<'16+' | '18+' | ''>('')
  const [dateInput, setDateInput] = useState("")
  const [showtime, setShowtime] = useState("")
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null)
  const [editId, setEditId] = useState<number | null>(null)

  if (!movieCtx) {
    return <div className="p-8 text-center">Movie context not available.</div>
  }
  const { movies, setMovies } = movieCtx

  function resetForm() {
    setTitle("")
    setImage("")
    setPrice("$12.99")
    setGenre("")
    setDuration("")
    setAgeRating('')
    setDateInput("")
    setShowtime("")
    setEditId(null)
  }

  function saveMovie() {
    if (!title.trim()) return
    // Update existing
    if (editId) {
      setMovies(movies.map(m => m.id === editId ? {
        ...m,
        title,
        image: image || "/placeholder.svg",
        price,
        genre,
        duration,
        ageRating: (ageRating || undefined) as Movie['ageRating'],
        ...(dateInput ? { dates: [...(m.dates || []), dateInput] } : {}),
        ...(showtime ? { showtimes: [...(m.showtimes || []), showtime] } : {}),
      } : m))
      resetForm()
      return
    }
    // Create new
    setMovies([
      ...movies,
      {
        id: Date.now(),
        title,
        image: image || "/placeholder.svg",
        price,
        genre,
        duration,
        ageRating: (ageRating || undefined) as Movie['ageRating'],
        dates: dateInput ? [dateInput] : [],
        showtimes: showtime ? [showtime] : [],
      },
    ])
    resetForm()
  }

  function addShowtime(id: number) {
    setMovies(movies.map(m => m.id === id ? { ...m, showtimes: [...(m.showtimes || []), showtime] } : m))
    setShowtime("")
    setSelectedMovie(null)
  }

  function addDate(id: number) {
    setMovies(movies.map(m => m.id === id ? { ...m, dates: [...(m.dates || []), dateInput] } : m))
    setDateInput("")
    setSelectedMovie(null)
  }

  function startEdit(movie: Movie) {
    setEditId(movie.id)
    setTitle(movie.title || "")
    setImage(movie.image || "")
    setPrice(movie.price || "")
    setGenre(movie.genre || "")
    setDuration(movie.duration || "")
    setAgeRating((movie.ageRating as any) || '')
    setDateInput("")
    setShowtime("")
  }

  function deleteMovie(id: number) {
    if (confirm("Delete this movie? This action cannot be undone.")) {
      setMovies(movies.filter(m => m.id !== id))
      if (editId === id) resetForm()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B001A] via-[#12002A] to-[#5B21B6]">
      <BackButton />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-poppins">Cine Admin Panel</motion.h1>
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-muted-foreground mb-8 font-poppins">Manage your cinema's movie listings, showtimes, and schedules.</motion.p>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="mb-8 flex items-center gap-4">
          <div className="relative w-full max-w-xs">
            <input className="w-full px-5 py-3 rounded-2xl border-2 border-accent/30 bg-white/10 text-white font-poppins focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all placeholder:text-accent/60 shadow-lg" placeholder="Search or filter shows..." />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/80" />
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create / Update Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lg:col-span-1 bg-white/10 backdrop-blur-lg rounded-2xl border-2 border-accent/40 p-6 shadow-xl hover:border-accent/70 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-1 font-poppins">{editId ? 'Edit Movie' : 'Add Movie'}</h2>
            {editId && (
              <p className="text-xs text-muted-foreground mb-3">Editing ID: {editId}. Leave Date/Showtime empty to keep existing.</p>
            )}
            <div className="space-y-3">
              <input className="w-full px-4 py-2 rounded-xl border border-white/20 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-poppins" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
              <input className="w-full px-4 py-2 rounded-xl border border-white/20 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-poppins" placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} />
              <input className="w-full px-4 py-2 rounded-xl border border-white/20 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-poppins" placeholder="Price (e.g. $12.99)" value={price} onChange={e=>setPrice(e.target.value)} />
              <input className="w-full px-4 py-2 rounded-xl border border-white/20 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-poppins" placeholder="Genre" value={genre} onChange={e=>setGenre(e.target.value)} />
              <input className="w-full px-4 py-2 rounded-xl border border-white/20 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-poppins" placeholder="Duration (e.g. 148 min)" value={duration} onChange={e=>setDuration(e.target.value)} />
              <select className="w-full px-4 py-2 rounded-xl border border-white/20 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-poppins" value={ageRating} onChange={e=>setAgeRating(e.target.value as any)}>
                <option value="">Age Rating</option>
                <option value="16+">16+</option>
                <option value="18+">18+</option>
              </select>
              <input className="w-full px-4 py-2 rounded-xl border border-white/20 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-poppins" placeholder="Date (YYYY-MM-DD)" value={dateInput} onChange={e=>setDateInput(e.target.value)} />
              <input className="w-full px-4 py-2 rounded-xl border border-white/20 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-poppins" placeholder="Showtime (e.g. 7:00 PM)" value={showtime} onChange={e=>setShowtime(e.target.value)} />
              <div className="flex gap-2">
                <button className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent text-white py-2.5 font-semibold hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-[1.02] font-poppins" onClick={saveMovie}>{editId ? 'Update Movie' : 'Save Movie'}</button>
                {editId && (
                  <button className="rounded-xl bg-white/10 text-foreground px-4 py-2 font-medium border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 font-poppins" onClick={resetForm}>Cancel</button>
                )}
              </div>
            </div>
          </motion.div>
          {/* List & Inline Updates */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-3 font-poppins">Current Movies</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movies.map(movie => (
                <motion.li key={movie.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="group p-4 rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-accent/40 hover:border-accent/70 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:scale-[1.01] shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={movie.image || '/placeholder.svg'} alt={movie.title} className="w-16 h-20 object-cover rounded group-hover:scale-105 transition-transform duration-300" />
                    <div className="flex-1">
                      <div className="font-semibold group-hover:text-primary transition-colors font-poppins">{movie.title}</div>
                      <div className="text-xs text-muted-foreground font-poppins">{movie.genre} • {movie.duration} • {movie.ageRating || 'NR'}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2 font-poppins">Price: <span className="text-foreground font-medium">{movie.price || '$—'}</span></div>
                  <div className="text-sm text-muted-foreground font-poppins">Dates: {movie.dates?.join(', ') || 'None'}</div>
                  <div className="text-sm text-muted-foreground mb-2 font-poppins">Times: {movie.showtimes?.join(', ') || 'None'}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="rounded-xl bg-white/10 backdrop-blur-sm text-foreground px-3 py-1.5 text-sm font-medium border border-white/20 hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20 hover:border-primary transition-all duration-300 hover:scale-105 font-poppins" onClick={()=>startEdit(movie)}>Edit</button>
                    <button className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 text-sm font-medium hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-105 font-poppins" onClick={()=>deleteMovie(movie.id)}>Delete</button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input className="flex-1 px-2 py-1 rounded border border-white/20 bg-background text-foreground text-sm focus:border-primary transition-all font-poppins" placeholder="New Date (YYYY-MM-DD)" value={dateInput} onChange={e=>setDateInput(e.target.value)} />
                    <button className="rounded bg-gradient-to-r from-primary to-accent text-white px-3 py-1 text-sm font-medium hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all font-poppins" onClick={()=>addDate(movie.id)}>Add Date</button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input className="flex-1 px-2 py-1 rounded border border-white/20 bg-background text-foreground text-sm focus:border-primary transition-all font-poppins" placeholder="New Showtime" value={showtime} onChange={e=>setShowtime(e.target.value)} />
                    <button className="rounded bg-gradient-to-r from-primary to-accent text-white px-3 py-1 text-sm font-medium hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all font-poppins" onClick={()=>addShowtime(movie.id)}>Add Showtime</button>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
