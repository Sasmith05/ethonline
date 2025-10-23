"use client"
import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts'

export default function AnalyticsChart({ data }: { data: Array<any> }) {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
          <XAxis dataKey="name" tick={{ fill: '#EDE9FE' }} />
          <YAxis tick={{ fill: '#EDE9FE' }} />
          <Tooltip contentStyle={{ background: 'rgba(30,0,61,0.85)', border: 'none', color: '#fff' }} />
          <Bar dataKey="value" fill="#7C3AED" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
