"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  Sparkles,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data - in real app this would come from API/AI
const dailyInsights = [
  {
    id: "contract-reminder",
    type: "reminder",
    priority: "high",
    title: "Contract Due Tomorrow",
    description: "Wedding gig at Riverside Venue requires signed contract",
    action: "Review Contract",
    icon: FileText,
    color: "text-red-400",
    bgColor: "bg-red-400/10"
  },
  {
    id: "peak-season",
    type: "insight",
    priority: "medium",
    title: "Peak Wedding Season Approaching",
    description: "Bookings typically increase 40% in the next 3 months",
    action: "View Trends",
    icon: TrendingUp,
    color: "text-fey-accent-green",
    bgColor: "bg-fey-accent-green/10"
  },
  {
    id: "equipment-check",
    type: "task",
    priority: "low",
    title: "Equipment Maintenance Due",
    description: "Schedule maintenance for your sound system",
    action: "Schedule",
    icon: Clock,
    color: "text-fey-accent-cyan",
    bgColor: "bg-fey-accent-cyan/10"
  },
  {
    id: "payment-received",
    type: "success",
    priority: "info",
    title: "Payment Received",
    description: "Corporate event payment of $2,500 processed",
    action: "View Details",
    icon: CheckCircle,
    color: "text-fey-accent-green",
    bgColor: "bg-fey-accent-green/10"
  }
]

interface InsightItemProps {
  insight: typeof dailyInsights[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}

function InsightItem({ insight, index, isExpanded, onToggle }: InsightItemProps) {
  const Icon = insight.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-all duration-200">
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          insight.bgColor
        )}>
          <Icon className={cn("w-4 h-4", insight.color)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white/90 truncate">
              {insight.title}
            </p>
            <div className="flex items-center gap-1">
              {insight.priority === "high" && (
                <AlertCircle className="w-3 h-3 text-red-400" />
              )}
              <ChevronRight className={cn(
                "w-4 h-4 text-white/40 transition-transform duration-200",
                isExpanded && "rotate-90"
              )} />
            </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-2"
              >
                <p className="text-xs text-white/60 leading-relaxed">
                  {insight.description}
                </p>
                <button className={cn(
                  "text-xs font-medium px-2 py-1 rounded-md transition-colors duration-200",
                  insight.color.replace("text-", "text-"),
                  insight.bgColor.replace("bg-", "bg-").replace("/10", "/20"),
                  "hover:bg-opacity-30"
                )}>
                  {insight.action}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export function DailyRecapCard() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [currentTime] = useState(new Date())

  const highPriorityCount = dailyInsights.filter(i => i.priority === "high").length
  const totalItems = dailyInsights.length

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <Card className="fey-card p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-fey-accent-purple/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-fey-accent-purple" />
            </div>
            <div>
              <h3 className="fey-heading text-lg text-white/90">Daily Recap</h3>
              <p className="text-xs text-white/60">
                {formatTime(currentTime)} • {totalItems} items
              </p>
            </div>
          </div>
          
          {highPriorityCount > 0 && (
            <div className="fey-pill fey-pill-red bg-red-400/20 text-red-400 border-red-400/30">
              {highPriorityCount} urgent
            </div>
          )}
        </div>

        <div className="space-y-1">
          {dailyInsights.map((insight, index) => (
            <InsightItem
              key={insight.id}
              insight={insight}
              index={index}
              isExpanded={expandedItem === insight.id}
              onToggle={() => setExpandedItem(
                expandedItem === insight.id ? null : insight.id
              )}
            />
          ))}
        </div>

        <div className="pt-3 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Stay on top of your bookings</span>
            <button className="text-fey-accent-purple hover:text-fey-accent-purple/80 transition-colors">
              View All
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}