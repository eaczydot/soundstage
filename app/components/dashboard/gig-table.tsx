"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Clock
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock data - in real app this would come from API
const gigData = [
  {
    id: "1",
    venue: "The Grand Ballroom",
    venueAvatar: "GB",
    location: "Downtown Chicago",
    date: "2024-02-15",
    status: "pending",
    fee: 2500,
    urgency: 85,
    type: "wedding",
    capacity: 200
  },
  {
    id: "2", 
    venue: "Riverside Gardens",
    venueAvatar: "RG",
    location: "Austin, TX",
    date: "2024-02-20",
    status: "confirmed",
    fee: 3200,
    urgency: 45,
    type: "corporate",
    capacity: 150
  },
  {
    id: "3",
    venue: "Blue Note Club", 
    venueAvatar: "BN",
    location: "Nashville, TN",
    date: "2024-02-12",
    status: "negotiating",
    fee: 1800,
    urgency: 92,
    type: "private",
    capacity: 80
  },
  {
    id: "4",
    venue: "Festival Grounds",
    venueAvatar: "FG", 
    location: "Portland, OR",
    date: "2024-03-05",
    status: "pending",
    fee: 5000,
    urgency: 30,
    type: "festival",
    capacity: 500
  },
  {
    id: "5",
    venue: "Oceanview Resort",
    venueAvatar: "OR",
    location: "Miami, FL",
    date: "2024-02-28",
    status: "confirmed",
    fee: 4100,
    urgency: 15,
    type: "wedding",
    capacity: 250
  }
]

type SortKey = "venue" | "location" | "date" | "fee" | "urgency"
type SortDirection = "asc" | "desc"

interface SortConfig {
  key: SortKey
  direction: SortDirection
}

const statusConfig = {
  pending: { 
    label: "Pending", 
    color: "text-yellow-400", 
    bg: "bg-yellow-400/20", 
    border: "border-yellow-400/30" 
  },
  confirmed: { 
    label: "Confirmed", 
    color: "text-fey-accent-green", 
    bg: "bg-fey-accent-green/20", 
    border: "border-fey-accent-green/30" 
  },
  negotiating: { 
    label: "Negotiating", 
    color: "text-fey-accent-purple", 
    bg: "bg-fey-accent-purple/20", 
    border: "border-fey-accent-purple/30" 
  },
  declined: { 
    label: "Declined", 
    color: "text-red-400", 
    bg: "bg-red-400/20", 
    border: "border-red-400/30" 
  }
}

interface StatusPillProps {
  status: keyof typeof statusConfig
}

function StatusPill({ status }: StatusPillProps) {
  const config = statusConfig[status]
  
  return (
    <span className={cn(
      "fey-pill border",
      config.color,
      config.bg,
      config.border
    )}>
      {config.label}
    </span>
  )
}

interface UrgencyBarProps {
  urgency: number
}

function UrgencyBar({ urgency }: UrgencyBarProps) {
  const getColor = (urgency: number) => {
    if (urgency >= 80) return "bg-red-400"
    if (urgency >= 60) return "bg-yellow-400" 
    if (urgency >= 40) return "bg-fey-accent-cyan"
    return "bg-fey-accent-green"
  }

  return (
    <div className="flex items-center gap-2 w-16">
      <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${urgency}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn("h-full rounded-full", getColor(urgency))}
        />
      </div>
      <span className="text-xs text-white/60 w-6 text-right">
        {urgency}%
      </span>
    </div>
  )
}

interface TableHeaderProps {
  sortConfig: SortConfig | null
  onSort: (key: SortKey) => void
}

function TableHeader({ sortConfig, onSort }: TableHeaderProps) {
  const getSortIcon = (key: SortKey) => {
    if (sortConfig?.key !== key) return null
    return sortConfig.direction === "asc" ? 
      <ChevronUp className="w-3 h-3" /> : 
      <ChevronDown className="w-3 h-3" />
  }

  return (
    <div className="sticky top-0 bg-fey-bg-secondary/95 backdrop-blur-sm border-b border-white/10 p-4">
      <div className="grid grid-cols-12 gap-4 text-xs font-medium text-white/60 uppercase tracking-wide">
        <button 
          className="col-span-3 flex items-center gap-1 text-left hover:text-white/80 transition-colors"
          onClick={() => onSort("venue")}
        >
          Venue {getSortIcon("venue")}
        </button>
        <button 
          className="col-span-2 flex items-center gap-1 text-left hover:text-white/80 transition-colors"
          onClick={() => onSort("location")}
        >
          Location {getSortIcon("location")}
        </button>
        <button 
          className="col-span-2 flex items-center gap-1 text-left hover:text-white/80 transition-colors"
          onClick={() => onSort("date")}
        >
          Date {getSortIcon("date")}
        </button>
        <div className="col-span-2">Status</div>
        <button 
          className="col-span-1 flex items-center gap-1 text-right hover:text-white/80 transition-colors"
          onClick={() => onSort("fee")}
        >
          Fee {getSortIcon("fee")}
        </button>
        <button 
          className="col-span-2 flex items-center gap-1 text-left hover:text-white/80 transition-colors"
          onClick={() => onSort("urgency")}
        >
          Urgency {getSortIcon("urgency")}
        </button>
      </div>
    </div>
  )
}

export function GigTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const handleSort = (key: SortKey) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return current.direction === "asc" 
          ? { key, direction: "desc" }
          : null
      }
      return { key, direction: "asc" }
    })
  }

  const sortedAndFilteredData = useMemo(() => {
    let filtered = gigData.filter(gig => 
      gig.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortConfig) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        if (sortConfig.key === "date") {
          aValue = new Date(a.date).getTime()
          bValue = new Date(b.date).getTime()
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [searchTerm, sortConfig])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="fey-card overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="fey-heading text-lg text-white/90">Gig Finder</h3>
            <p className="text-sm text-white/60">Available performance opportunities</p>
          </div>
          <Button 
            size="sm" 
            className="bg-fey-accent-green/20 text-fey-accent-green hover:bg-fey-accent-green/30 border border-fey-accent-green/30"
          >
            New Enquiry
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search venues or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
          <Button 
            size="sm" 
            variant="outline"
            className="border-white/10 text-white/60 hover:text-white hover:bg-white/5"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <TableHeader sortConfig={sortConfig} onSort={handleSort} />
        
        <div className="divide-y divide-white/5">
          {sortedAndFilteredData.map((gig, index) => (
            <motion.div
              key={gig.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="grid grid-cols-12 gap-4 p-4 hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-fey-accent-green/20 flex items-center justify-center text-xs font-medium text-fey-accent-green">
                  {gig.venueAvatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">{gig.venue}</p>
                  <p className="text-xs text-white/60">{gig.capacity} capacity</p>
                </div>
              </div>
              
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-white/80">{gig.location}</p>
              </div>
              
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-white/80">{formatDate(gig.date)}</p>
              </div>
              
              <div className="col-span-2 flex items-center">
                <StatusPill status={gig.status as keyof typeof statusConfig} />
              </div>
              
              <div className="col-span-1 flex items-center justify-end">
                <p className="text-sm font-medium text-white/90">
                  ${gig.fee.toLocaleString()}
                </p>
              </div>
              
              <div className="col-span-2 flex items-center">
                <UrgencyBar urgency={gig.urgency} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {sortedAndFilteredData.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-white/60">No gigs found matching your search.</p>
        </div>
      )}
    </Card>
  )
}