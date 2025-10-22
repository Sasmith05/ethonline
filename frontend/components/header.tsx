"use client"

import React, { useEffect, useRef, useState, useContext } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Ticket, Search, User, Ticket as TicketIcon, Gift, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { useIsMobile } from "@/hooks/use-mobile"
import { WalletContext } from "@/components/WalletProvider"

export default function Header() {
  const wallet = useContext(WalletContext)
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const menu = [
    { label: "View Profile", icon: User, action: () => router.push("/profile") },
    { label: "My Bookings", icon: TicketIcon, action: () => router.push("/bookings") },
    { label: "Offers", icon: Gift, action: () => router.push("/offers") },
    { label: "Explore", icon: Search, action: () => router.push("/explore") },
    { label: "Settings", icon: Settings },
    { label: "Logout", icon: LogOut, action: () => wallet?.disconnect() },
  ]

  useEffect(() => {
    if (!open) return
    function handle(e: MouseEvent | KeyboardEvent) {
      if (e instanceof KeyboardEvent && e.key === "Escape") setOpen(false)
      if (e instanceof MouseEvent && popoverRef.current && !popoverRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handle)
    document.addEventListener("keydown", handle)
    return () => {
      document.removeEventListener("mousedown", handle)
      document.removeEventListener("keydown", handle)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-poppins">
              FlimX
            </span>
          </div>
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 backdrop-blur-sm text-foreground placeholder-muted-foreground rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary font-poppins"
            />
          </div>
          <div className="flex items-center gap-4">
            {/* Wallet Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5">
              <div className={`w-2 h-2 rounded-full ${wallet?.address ? 'bg-green-500' : 'bg-yellow-400'}`} />
              <span className="text-sm">
                {wallet?.address ? `Wallet: Connected` : 'Wallet: Disconnected'}
              </span>
              {!wallet?.address ? (
                <button className="text-xs underline" onClick={() => wallet?.connect()}>Connect</button>
              ) : (
                <button className="text-xs underline" onClick={() => wallet?.disconnect()}>Disconnect</button>
              )}
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  className="focus:outline-none"
                  aria-label="Open profile menu"
                  onClick={() => setOpen((v) => !v)}
                >
                  <Avatar className="w-10 h-10 border-2 border-primary shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent">
                      <User className="w-6 h-6 text-white" />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              {open && (
                isMobile ? (
                  <div
                    ref={popoverRef}
                    className="fixed inset-x-0 bottom-0 z-50 bg-[#1E1B4B] rounded-t-2xl shadow-2xl p-4 pt-6 border-t border-[#6D28D9]/30 flex flex-col gap-2"
                  >
                    {menu.map(({ label, icon: Icon, action }) => (
                      <motion.button
                        key={label}
                        whileHover={{ scale: 1.04 }}
                        className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-[#E5E7EB] rounded-xl transition-all duration-200 hover:bg-[#6D28D9] hover:text-white focus:bg-[#6D28D9] outline-none font-poppins shadow-md"
                        tabIndex={0}
                        onClick={() => { setOpen(false); if (action) action(); }}
                      >
                        <Icon className="w-5 h-5 text-accent" />
                        {label}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <PopoverContent
                    ref={popoverRef}
                    align="end"
                    className="w-56 p-2 bg-[#1E1B4B] border border-[#6D28D9]/30 shadow-xl rounded-2xl mt-2"
                    sideOffset={12}
                  >
                    <div className="flex flex-col gap-1">
                      {menu.map(({ label, icon: Icon, action }) => (
                        <motion.button
                          key={label}
                          whileHover={{ scale: 1.04 }}
                          className="flex items-center gap-3 px-4 py-2 text-base font-medium text-[#E5E7EB] rounded-xl transition-all duration-200 hover:bg-[#6D28D9] hover:text-white focus:bg-[#6D28D9] outline-none font-poppins shadow-md"
                          tabIndex={0}
                          onClick={() => { setOpen(false); if (action) action(); }}
                        >
                          <Icon className="w-5 h-5 text-accent" />
                          {label}
                        </motion.button>
                      ))}
                    </div>
                  </PopoverContent>
                )
              )}
            </Popover>
          </div>
        </div>
      </div>
    </header>
  )
}
