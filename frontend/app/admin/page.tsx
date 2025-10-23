"use client"
import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { WalletContext } from '@/components/WalletProvider'
import { MovieContext, type Movie } from '@/components/MovieProvider'
import { Search } from 'lucide-react'
import BackButton from '@/components/BackButton'

export default function AdminPage() {
  const router = useRouter()
  const wallet = useContext(WalletContext)
  const movieCtx = useContext(MovieContext)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("12.99")
  const [genre, setGenre] = useState("")
  const [duration, setDuration] = useState("")
  const [ageRating, setAgeRating] = useState<'16+' | '18+' | ''>('')
  const [dateInput, setDateInput] = useState("")
  const [showtime, setShowtime] = useState("")
  const [editId, setEditId] = useState<number | null>(null)

  if (!movieCtx) return <div className="p-8">Movie context not available</div>
  const { movies, setMovies } = movieCtx

  function resetForm() {
    setTitle("")
    setImage("")
    setPrice("12.99")
    setGenre("")
    setDuration("")
    setAgeRating('')
    setDateInput("")
    setShowtime("")
    setEditId(null)
  }

  function saveMovie() {
    if (!title.trim()) return
    if (editId) {
      setMovies(movies.map(m => m.id === editId ? {
        ...m,
        title,
        image: image || '/placeholder.svg',
        price,
        genre,
        duration,
        ageRating: ageRating || undefined,
        dates: dateInput ? [...(m.dates ?? []), dateInput] : m.dates,
        showtimes: showtime ? [...(m.showtimes ?? []), showtime] : m.showtimes,
      } : m))
      resetForm()
      return
    }

    const newMovie: Movie = {
      id: Date.now(),
      title,
      image: image || '/placeholder.svg',
      price,
      genre,
      duration,
      ageRating: ageRating || undefined,
      dates: dateInput ? [dateInput] : [],
      showtimes: showtime ? [showtime] : [],
    }
    setMovies([...movies, newMovie])
    resetForm()
  }

  function startEdit(movie: Movie) {
    setEditId(movie.id)
    setTitle(movie.title || '')
    setImage(movie.image || '')
    setPrice(movie.price || '12.99')
    setGenre(movie.genre || '')
    setDuration(movie.duration || '')
    setAgeRating((movie as any).ageRating || '')
  }

  function deleteMovie(id: number) {
    if (!confirm('Delete this movie?')) return
    setMovies(movies.filter(m => m.id !== id))
    if (editId === id) resetForm()
  }

  function addDate(id: number) {
    if (!dateInput.trim()) return
    setMovies(movies.map(m => m.id === id ? { ...m, dates: [...(m.dates ?? []), dateInput] } : m))
    setDateInput("")
  }

  function addShowtime(id: number) {
    if (!showtime.trim()) return
    setMovies(movies.map(m => m.id === id ? { ...m, showtimes: [...(m.showtimes ?? []), showtime] } : m))
    setShowtime("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B001A] via-[#12002A] to-[#5B21B6] text-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold font-poppins">Cine Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/analytics')} className="px-4 py-2 rounded-xl bg-white/6">Analytics</button>
            {wallet?.address ? (
              <div className="px-3 py-2 rounded-lg bg-white/5 text-sm">{wallet.address.slice(0,6)}...{wallet.address.slice(-4)}</div>
            ) : (
              <button onClick={() => wallet?.connect()} className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#C77DFF]">Connect Wallet</button>
            )}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="relative w-full max-w-xs">
            <input className="w-full px-5 py-3 rounded-2xl border-2 border-accent/30 bg-white/10 text-white font-poppins placeholder:text-accent/60" placeholder="Search or filter shows..." />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/80" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1 bg-white/10 backdrop-blur-lg rounded-2xl border-2 border-accent/40 p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-2 font-poppins">{editId ? 'Edit Movie' : 'Add Movie'}</h2>
            <div className="space-y-3">
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full px-4 py-2 rounded-xl bg-background text-foreground" />
              <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" className="w-full px-4 py-2 rounded-xl bg-background text-foreground" />
              <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" className="w-full px-4 py-2 rounded-xl bg-background text-foreground" />
              <input value={genre} onChange={e=>setGenre(e.target.value)} placeholder="Genre" className="w-full px-4 py-2 rounded-xl bg-background text-foreground" />
              <input value={duration} onChange={e=>setDuration(e.target.value)} placeholder="Duration" className="w-full px-4 py-2 rounded-xl bg-background text-foreground" />
              <select value={ageRating} onChange={e=>setAgeRating(e.target.value as any)} className="w-full px-4 py-2 rounded-xl bg-background text-foreground">
                <option value="">Age Rating</option>
                <option value="16+">16+</option>
                <option value="18+">18+</option>
              </select>
              <input value={dateInput} onChange={e=>setDateInput(e.target.value)} placeholder="Date" className="w-full px-4 py-2 rounded-xl bg-background text-foreground" />
              <input value={showtime} onChange={e=>setShowtime(e.target.value)} placeholder="Showtime" className="w-full px-4 py-2 rounded-xl bg-background text-foreground" />
              <div className="flex gap-2">
                <button onClick={saveMovie} className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent text-white py-2.5 font-semibold">{editId ? 'Update' : 'Save'}</button>
                {editId && <button onClick={resetForm} className="rounded-xl bg-white/10 px-4 py-2">Cancel</button>}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-3 font-poppins">Current Movies</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movies.map(movie => (
                <motion.li key={movie.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-accent/40">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={movie.image || '/placeholder.svg'} alt={movie.title} className="w-16 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold">{movie.title}</div>
                      <div className="text-xs text-muted-foreground">{movie.genre}  {movie.duration}</div>
                    </div>
                  </div>
                  <div className="text-sm mb-2">Price: {movie.price || '—'}</div>
                  <div className="text-sm">Dates: {movie.dates?.join(', ') || 'None'}</div>
                  <div className="text-sm mb-2">Times: {movie.showtimes?.join(', ') || 'None'}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>startEdit(movie)} className="rounded-xl bg-white/10 px-3 py-1.5">Edit</button>
                    <button onClick={()=>deleteMovie(movie.id)} className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5">Delete</button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input placeholder="New Date" value={dateInput} onChange={e=>setDateInput(e.target.value)} className="flex-1 px-2 py-1 rounded border border-white/20 bg-background text-foreground text-sm" />
                    <button onClick={()=>addDate(movie.id)} className="rounded bg-gradient-to-r from-primary to-accent text-white px-3 py-1 text-sm">Add</button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input placeholder="New Showtime" value={showtime} onChange={e=>setShowtime(e.target.value)} className="flex-1 px-2 py-1 rounded border border-white/20 bg-background text-foreground text-sm" />
                    <button onClick={()=>addShowtime(movie.id)} className="rounded bg-gradient-to-r from-primary to-accent text-white px-3 py-1 text-sm">Add</button>
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
