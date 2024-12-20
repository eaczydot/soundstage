'use client'

import { useEffect } from "react"
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
import { Search, FileText, MessageSquare } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStore } from "@/store"
import { getBookings } from "@/services/bookings"
import { useState } from "react"

export function BookingsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const { bookings, setBookings, isLoading, setIsLoading } = useStore()

  useEffect(() => {
    async function fetchBookings() {
      setIsLoading(true)
      try {
        const data = await getBookings()
        setBookings(data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [setBookings, setIsLoading])

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Venue</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.venue}</TableCell>
                <TableCell>
                  {new Date(booking.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>
                  <Badge variant={
                    booking.status === 'confirmed' ? 'success' :
                    booking.status === 'pending' ? 'warning' :
                    'destructive'
                  }>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>${booking.amount}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
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