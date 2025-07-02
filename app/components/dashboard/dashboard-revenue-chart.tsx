"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const timeRanges = [
  { label: "1M", value: "1M" },
  { label: "3M", value: "3M" },
  { label: "6M", value: "6M" },
  { label: "YTD", value: "YTD" },
  { label: "1Y", value: "1Y" }
]

// Mock data - in real app this would come from API
const revenueData = {
  "1M": {
    current: 4250,
    previous: 3890,
    change: 9.3,
    sparkline: [3200, 3400, 3100, 3600, 3800, 3500, 4100, 4250]
  },
  "3M": {
    current: 12750,
    previous: 11200,
    change: 13.8,
    sparkline: [9800, 10200, 9500, 11000, 11800, 10900, 12200, 12750]
  },
  "6M": {
    current: 28500,
    previous: 24800,
    change: 14.9,
    sparkline: [18000, 19500, 18800, 22000, 24500, 23200, 26800, 28500]
  },
  "YTD": {
    current: 31200,
    previous: 26400,
    change: 18.2,
    sparkline: [20000, 22000, 21500, 25000, 27500, 26800, 29500, 31200]
  },
  "1Y": {
    current: 52800,
    previous: 44200,
    change: 19.5,
    sparkline: [35000, 38000, 36500, 42000, 46000, 44500, 49800, 52800]
  }
}

interface SparklineProps {
  data: number[]
  isPositive: boolean
}

function Sparkline({ data, isPositive }: SparklineProps) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="w-24 h-12 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={isPositive ? "#00FF88" : "#FF4757"}
          strokeWidth="2"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

export function DashboardRevenueChart() {
  const [selectedRange, setSelectedRange] = useState("3M")
  const data = revenueData[selectedRange as keyof typeof revenueData]
  const isPositive = data.change > 0

  return (
    <Card className="fey-card p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="fey-heading text-lg text-white/90">Revenue Overview</h3>
            <p className="text-sm text-white/60">Total earnings from performances</p>
          </div>
          <Sparkline data={data.sparkline} isPositive={isPositive} />
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light text-white">
                ${data.current.toLocaleString()}
              </span>
              <div className={cn(
                "flex items-center gap-1 text-sm",
                isPositive ? "text-fey-accent-green" : "text-red-400"
              )}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(data.change)}%</span>
              </div>
            </div>
            <p className="text-xs text-white/60">
              vs ${data.previous.toLocaleString()} previous period
            </p>
          </div>

          <div className="flex items-center gap-1">
            {timeRanges.map((range) => (
              <motion.button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-2 py-1 text-xs rounded-md transition-all duration-200",
                  selectedRange === range.value
                    ? "bg-fey-accent-green/20 text-fey-accent-green border border-fey-accent-green/30"
                    : "text-white/60 hover:text-white/80 hover:bg-white/5"
                )}
              >
                {range.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}