"use client"

import { useContext, useMemo, useState } from "react"
import { X, Calendar, Clock, Users, CheckCircle2, UploadCloud, ShieldCheck, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletContext } from "@/components/WalletProvider"
import type { Movie } from "@/components/MovieProvider"
import { useRouter } from "next/navigation"

type Props = { movie: Movie, isOpen: boolean, onClose: () => void }

export default function BookingModal({ movie, isOpen, onClose }: Props) {
  const wallet = useContext(WalletContext)
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [docFile, setDocFile] = useState<File | null>(null)
  const [isPaying, setIsPaying] = useState(false)
  const [tempToken, setTempToken] = useState<string | null>(null)

  const requiresVerification = useMemo(() => movie?.ageRating === '18+', [movie])

  const times: string[] = ["10:00 AM", "1:30 PM", "4:45 PM", "7:30 PM", "10:00 PM"]
  const seats: number[] = Array.from({ length: 60 }, (_, i) => i + 1)

  const toggleSeat = (seat: number) => {
    setSelectedSeats((prev: number[]) => (prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={onClose} />

      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{movie.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {movie.genre} • {movie.duration}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-foreground font-semibold mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              Select Date
            </label>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date()
                date.setDate(date.getDate() + i)
                const dateStr = date.toISOString().split("T")[0]
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedDate === dateStr
                        ? "bg-gradient-to-br from-primary to-accent border-primary/50 text-white"
                        : "border-white/10 bg-white/5 hover:border-primary/30 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-xs font-semibold">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-sm font-bold">{date.getDate()}</div>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-foreground font-semibold mb-4">
              <Clock className="w-5 h-5 text-primary" />
              Select Time
            </label>
            <div className="grid grid-cols-5 gap-2">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedTime === time
                      ? "bg-gradient-to-br from-primary to-accent border-primary/50 text-white"
                      : "border-white/10 bg-white/5 hover:border-primary/30 hover:bg-white/10"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-foreground font-semibold mb-4">
              <Users className="w-5 h-5 text-primary" />
              Select Seats ({selectedSeats.length} selected)
            </label>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="text-center mb-6">
                <div className="inline-block w-full max-w-xs h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full mb-4" />
                <p className="text-xs text-muted-foreground font-semibold">SCREEN</p>
              </div>
              <div className="grid grid-cols-10 gap-2">
                {seats.map((seat) => (
                  <button
                    key={seat}
                    onClick={() => toggleSeat(seat)}
                    className={`w-8 h-8 rounded text-xs font-semibold transition-all ${
                      selectedSeats.includes(seat)
                        ? "bg-gradient-to-br from-primary to-accent text-white"
                        : "bg-white/10 border border-white/20 hover:bg-primary/30"
                    }`}
                  >
                    {seat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-5 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-muted-foreground">Subtotal ({selectedSeats.length} seats)</span>
              <span className="text-foreground font-semibold">${(selectedSeats.length * 12.99).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
              <span className="text-muted-foreground">Booking Fee</span>
              <span className="text-foreground font-semibold">$2.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground font-bold">Total</span>
              <span className="text-accent font-bold text-xl">${(selectedSeats.length * 12.99 + 2).toFixed(2)}</span>
            </div>
          </div>

          {requiresVerification && (
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span className="font-semibold">Age Verification Required (18+)</span>
              </div>
              <label className="block text-sm text-muted-foreground mb-2">Upload a valid ID document (PNG/JPG/PDF)</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setDocFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/90 file:text-gray-900 hover:file:bg-white"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 hover:bg-white/10 bg-transparent text-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!wallet?.address) {
                  await wallet?.connect()
                  if (!wallet?.address) return
                }
                if (requiresVerification && !docFile) return
                try {
                  setIsPaying(true)
                  // Simulate on-chain payment with a short delay
                  await new Promise(r => setTimeout(r, 1200))
                  // Generate a temporary token
                  const token = Math.random().toString(36).slice(2, 10).toUpperCase()
                  setTempToken(token)
                  setTimeout(() => {
                    router.push("/ticket-confirmation");
                  }, 800);
                } finally {
                  setIsPaying(false)
                }
              }}
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white font-semibold"
              disabled={selectedSeats.length === 0 || !selectedDate || !selectedTime || (requiresVerification && !docFile) || isPaying}
            >
              {isPaying ? (
                <>
                  <Wallet className="w-4 h-4 mr-2" /> Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Proceed to Payment
                </>
              )}
            </Button>
          </div>

          {tempToken && (
            <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="font-semibold mb-1">Booking Received</div>
              <div className="text-sm text-muted-foreground mb-2">Temporary Token (save this):</div>
              <div className="text-xl font-mono tracking-wider">{tempToken}</div>
              <div className="text-sm text-muted-foreground mt-3">The official ticket will be released 20 minutes before the show.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
