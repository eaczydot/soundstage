"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { CompactProps } from "@/types/layout"
import { cn } from "@/lib/utils"
import { MapPin, Clock } from "lucide-react"
import { format } from "date-fns"

interface Performance {
  id: string
  venue: string
  location: string
  date: string
  time: string
  status: 'confirmed' | 'pending'
}

export function UpcomingPerformances({ isCompact }: CompactProps) {
  const performances: Performance[] = [
    {
      id: '1',
      venue: 'The Blue Note',
      location: 'New York, NY',
      date: '2024-03-19',
      time: '20:00',
      status: 'confirmed'
    },
    {
      id: '2',
      venue: 'Jazz Corner',
      location: 'Chicago, IL',
      date: '2024-03-24',
      time: '21:00',
      status: 'pending'
    },
    {
      id: '3',
      venue: 'Village Vanguard',
      location: 'New York, NY',
      date: '2024-03-27',
      time: '19:30',
      status: 'confirmed'
    }
  ]

  const getStatusBadge = (status: Performance['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Confirmed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Pending</Badge>
    }
  }

  return (
    <ScrollArea className="h-full px-4">
      <div className="space-y-4">
        {performances.map((performance, index) => (
          <motion.div
            key={performance.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{performance.venue}</h3>
                {getStatusBadge(performance.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{performance.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{performance.time}</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {format(new Date(performance.date), 'EEEE, MMMM d, yyyy')}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  )
} 