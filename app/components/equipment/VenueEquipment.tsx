'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface VenueEquipmentItem {
  id: string
  venue: string
  equipment: string
  status: 'available' | 'unavailable' | 'maintenance'
  notes?: string
  lastChecked?: string
}

export function VenueEquipment() {
  const [searchTerm, setSearchTerm] = useState("")
  const [venueFilter, setVenueFilter] = useState<string>("all")

  const equipmentList: VenueEquipmentItem[] = [
    {
      id: "1",
      venue: "The Blue Note",
      equipment: "Grand Piano",
      status: "available",
      notes: "Yamaha C7, recently tuned",
      lastChecked: "2024-03-01",
    },
    {
      id: "2",
      venue: "Jazz Corner",
      equipment: "House PA System",
      status: "maintenance",
      notes: "Left speaker needs repair",
      lastChecked: "2024-02-15",
    },
  ]

  const filteredEquipment = equipmentList.filter((item) => {
    const matchesSearch = 
      item.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVenue = venueFilter === "all" || item.venue === venueFilter
    return matchesSearch && matchesVenue
  })

  const venues = Array.from(new Set(equipmentList.map(item => item.venue)))

  return (
    <Card>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search venue equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={venueFilter}
              onValueChange={setVenueFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Venues" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Venues</SelectItem>
                {venues.map((venue) => (
                  <SelectItem key={venue} value={venue}>
                    {venue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Venue</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Last Checked</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.venue}</TableCell>
                <TableCell>{item.equipment}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "available"
                        ? "success"
                        : item.status === "maintenance"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {item.notes}
                </TableCell>
                <TableCell>
                  {item.lastChecked && new Date(item.lastChecked).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
} 