"use client"
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react"

type WalletContextType = {
  address: string | null
  isConnecting: boolean
  hasProvider: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

export const WalletContext = createContext<WalletContextType | null>(null)

declare global {
  interface Window {
    ethereum?: any
  }
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasProvider, setHasProvider] = useState(false)

  useEffect(() => {
    setHasProvider(typeof window !== "undefined" && !!window.ethereum)
  }, [])

  const connect = useCallback(async () => {
    if (!window?.ethereum) {
      alert("MetaMask not detected. Please install MetaMask.")
      return
    }
    try {
      setIsConnecting(true)
      const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAddress(accounts?.[0] ?? null)
    } catch (err) {
      console.error("Wallet connect error:", err)
      throw err
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
  }, [])

  const value = useMemo(
    () => ({ address, isConnecting, hasProvider, connect, disconnect }),
    [address, isConnecting, hasProvider, connect, disconnect]
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
