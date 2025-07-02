"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data - in real app this would come from API
const categoryData = [
  {
    id: "corporate",
    name: "Corporate Events",
    bookings: 12,
    totalBookings: 45,
    revenue: 8500,
    change: 15.2,
    color: "fey-accent-green"
  },
  {
    id: "wedding",
    name: "Weddings",
    bookings: 18,
    totalBookings: 45,
    revenue: 12200,
    change: 8.7,
    color: "fey-accent-purple"
  },
  {
    id: "festival",
    name: "Festivals",
    bookings: 6,
    totalBookings: 45,
    revenue: 15000,
    change: -3.2,
    color: "fey-accent-cyan"
  },
  {
    id: "private",
    name: "Private Parties",
    bookings: 9,
    totalBookings: 45,
    revenue: 4800,
    change: 22.1,
    color: "fey-accent-blue"
  }
]

interface PerformanceBarProps {
  percentage: number
  color: string
  isPositive: boolean
}

function PerformanceBar({ percentage, color, isPositive }: PerformanceBarProps) {
  return (
    <div className="flex items-center gap-2 w-24">
      <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={cn(
            "h-full rounded-full",
            color === "fey-accent-green" && "bg-fey-accent-green",
            color === "fey-accent-purple" && "bg-fey-accent-purple",
            color === "fey-accent-cyan" && "bg-fey-accent-cyan",
            color === "fey-accent-blue" && "bg-fey-accent-blue"
          )}
        />
      </div>
      <span className={cn(
        "text-xs font-medium w-8 text-right",
        isPositive ? "text-fey-accent-green" : "text-red-400"
      )}>
        {isPositive ? "+" : ""}{percentage.toFixed(0)}%
      </span>
    </div>
  )
}

interface CategoryRowProps {
  category: typeof categoryData[0]
  index: number
}

function CategoryRow({ category, index }: CategoryRowProps) {
  const percentage = (category.bookings / category.totalBookings) * 100
  const isPositive = category.change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center justify-between py-3 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors duration-200"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className={cn(
          "w-2 h-2 rounded-full",
          category.color === "fey-accent-green" && "bg-fey-accent-green",
          category.color === "fey-accent-purple" && "bg-fey-accent-purple",
          category.color === "fey-accent-cyan" && "bg-fey-accent-cyan",
          category.color === "fey-accent-blue" && "bg-fey-accent-blue"
        )} />
        <div>
          <p className="text-sm font-medium text-white/90">{category.name}</p>
          <p className="text-xs text-white/60">
            {category.bookings} of {category.totalBookings} bookings
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-white/90">
            ${category.revenue.toLocaleString()}
          </p>
          <p className="text-xs text-white/60">Revenue</p>
        </div>
        
        <PerformanceBar 
          percentage={percentage} 
          color={category.color}
          isPositive={isPositive}
        />
      </div>
    </motion.div>
  )
}

export function CategoryPerformanceList() {
  const totalBookings = categoryData.reduce((sum, cat) => sum + cat.bookings, 0)
  const totalRevenue = categoryData.reduce((sum, cat) => sum + cat.revenue, 0)

  return (
    <Card className="fey-card p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="fey-heading text-lg text-white/90">Performance by Category</h3>
            <p className="text-sm text-white/60">
              {totalBookings} total bookings • ${totalRevenue.toLocaleString()} revenue
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60">Distribution</p>
            <p className="text-xs text-white/40">Last 30 days</p>
          </div>
        </div>

        <div className="space-y-1">
          {categoryData.map((category, index) => (
            <CategoryRow 
              key={category.id} 
              category={category} 
              index={index} 
            />
          ))}
        </div>

        <div className="pt-2 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Best performing: {categoryData[0].name}</span>
            <span>Avg booking value: ${Math.round(totalRevenue / totalBookings).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}