"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function AnalyticsTable({ rows }: { rows: Array<any> }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/6 text-sm text-muted-foreground font-medium">Recent Transactions</div>
      <div className="max-h-64 overflow-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="sticky top-0 bg-[#1E003D]/60 backdrop-blur">
            <tr className="text-left text-xs text-muted-foreground">
              <th className="p-3">Ticket ID</th>
              <th className="p-3">Movie</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr key={r.id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="border-b border-white/6 hover:bg-white/3">
                <td className="p-3 font-mono text-xs">{r.id}</td>
                <td className="p-3">{r.movie}</td>
                <td className="p-3">{r.date}</td>
                <td className="p-3">{r.amount}</td>
                <td className={`p-3 font-medium ${r.status === 'Refunded' ? 'text-red-400' : 'text-green-300'}`}>{r.status}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
