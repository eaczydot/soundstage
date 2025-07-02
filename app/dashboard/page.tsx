"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardRevenueChart } from "@/components/dashboard/dashboard-revenue-chart"
import { CategoryPerformanceList } from "@/components/dashboard/category-performance-list"
import { DailyRecapCard } from "@/components/dashboard/daily-recap-card"
import { GigTable } from "@/components/dashboard/gig-table"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [currentTime] = useState(new Date())
  
  const formatGreeting = (date: Date) => {
    const hour = date.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getArtistName = () => "Alex" // In real app, get from user context

  return (
    <div className="min-h-screen bg-fey-bg p-4 space-y-6">
      {/* Hero Greeting Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <h1 className="fey-heading text-3xl text-white">
          {formatGreeting(currentTime)}, {getArtistName()}
        </h1>
        <p className="text-white/60">
          You have <span className="text-fey-accent-green font-medium">3 upcoming shows</span> this week
        </p>
      </motion.div>

      {/* Top Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <DashboardRevenueChart />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CategoryPerformanceList />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <DailyRecapCard />
        </motion.div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Gig Finder Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="xl:col-span-2"
        >
          <GigTable />
        </motion.div>
      </div>

      {/* Quick Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="fey-card p-4 text-center">
          <p className="text-2xl font-light text-white mb-1">12</p>
          <p className="text-xs text-white/60">This Month</p>
        </Card>
        <Card className="fey-card p-4 text-center">
          <p className="text-2xl font-light text-fey-accent-green mb-1">$8.2K</p>
          <p className="text-xs text-white/60">Revenue</p>
        </Card>
        <Card className="fey-card p-4 text-center">
          <p className="text-2xl font-light text-fey-accent-purple mb-1">4.9</p>
          <p className="text-xs text-white/60">Avg Rating</p>
        </Card>
        <Card className="fey-card p-4 text-center">
          <p className="text-2xl font-light text-fey-accent-cyan mb-1">89%</p>
          <p className="text-xs text-white/60">Response Rate</p>
        </Card>
      </motion.div>
    </div>
  )
}
