"use client"
import React from 'react'
import BackButton from '@/components/BackButton'
import AnalyticsCard from '@/components/analytics/AnalyticsCard'
import AnalyticsChart from '@/components/analytics/AnalyticsChart'
import AnalyticsTable from '@/components/analytics/AnalyticsTable'
import { Ticket, RefreshCw, CreditCard, ArrowLeft } from 'lucide-react'

const mockChart = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 9 },
  { name: 'Thu', value: 22 },
  { name: 'Fri', value: 30 },
  { name: 'Sat', value: 45 },
  { name: 'Sun', value: 28 },
]

const mockRows = [
  { id: 'T-1001', movie: 'Starlight', date: '2025-10-21 19:00', amount: '$12.99', status: 'Booked' },
  { id: 'T-1002', movie: 'Noir Night', date: '2025-10-21 20:00', amount: '$10.00', status: 'Refunded' },
  { id: 'T-1003', movie: 'Future Realm', date: '2025-10-22 16:30', amount: '$15.00', status: 'Booked' },
]

// Small motion counter component
function MotionCount({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0)
  React.useEffect(() => {
    let start = 0
    const duration = 900
    const stepTime = 16
    const steps = Math.ceil(duration / stepTime)
    const inc = value / steps
    const t = setInterval(() => {
      start += inc
      if (start >= value) {
        setDisplay(value)
        clearInterval(t)
      } else {
        setDisplay(Math.floor(start))
      }
    }, stepTime)
    return () => clearInterval(t)
  }, [value])
  return <span className="text-2xl font-semibold">{display}</span>
}

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0B001A] via-[#12002A] to-[#1E003D] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <BackButton />
          <h1 className="text-2xl md:text-3xl font-semibold font-poppins">Cine Admin — Analytics</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <AnalyticsCard title="Tickets Booked" icon={<Ticket />}> 
            <MotionCount value={1243} />
          </AnalyticsCard>
          <AnalyticsCard title="Refunds Initiated" icon={<RefreshCw />}> 
            <MotionCount value={24} />
          </AnalyticsCard>
          <AnalyticsCard title="Transactions (Revenue)" icon={<CreditCard />}> 
            <span className="text-xl">$<strong>12,340</strong></span>
          </AnalyticsCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-transparent">
            <div className="rounded-2xl p-4 bg-white/5 backdrop-blur border border-white/8">
              <h3 className="text-sm text-muted-foreground mb-3">Transactions Over Time</h3>
              <AnalyticsChart data={mockChart} />
            </div>
          </div>
          <AnalyticsTable rows={mockRows} />
        </div>
      </div>
    </main>
  )
}

// Small motion counter component
function motionCount({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0)
  React.useEffect(() => {
    let start = 0
    const duration = 900
    const stepTime = 16
    const steps = Math.ceil(duration / stepTime)
    const inc = value / steps
    const t = setInterval(() => {
      start += inc
      if (start >= value) {
        setDisplay(value)
        clearInterval(t)
      } else {
        setDisplay(Math.floor(start))
      }
    }, stepTime)
    return () => clearInterval(t)
  }, [value])
  return <span className="text-2xl font-semibold">{display}</span>
}
