"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function AnalyticsCard({ children, title, icon }: { children: React.ReactNode, title: string, icon?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/8 shadow-lg relative overflow-hidden"
    >
      <div className="flex items-start gap-3">
        {icon && <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/30 to-[#C77DFF]/20 flex items-center justify-center text-white drop-shadow">{icon}</div>}
        <div className="flex-1">
          <div className="text-sm text-muted-foreground mb-1">{title}</div>
          <div className="text-2xl font-semibold">{children}</div>
        </div>
      </div>
    </motion.div>
  )
}
