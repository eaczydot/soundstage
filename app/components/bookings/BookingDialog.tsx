'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStore } from "@/store"
import { createBooking } from "@/services/bookings"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  date?: Date | null
}

export function BookingDialog({ open, onOpenChange, date }: BookingDialogProps) {
  const [formData, setFormData] = useState({
    venue: "",
    date: date?.toISOString().split('T')[0] || "",
    time: "20:00",
    notes: "",
  })
  const { addBooking } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newBooking = await createBooking(formData)
      addBooking(newBooking)
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating booking:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
          <DialogDescription>
            Fill in the details for your new booking request.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="venue">Venue</Label>
              <Select
                value={formData.venue}
                onValueChange={(value) =>
                  setFormData({ ...formData, venue: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select venue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue-note">The Blue Note</SelectItem>
                  <SelectItem value="jazz-corner">Jazz Corner</SelectItem>
                  <SelectItem value="rhythm-house">Rhythm House</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Any special requirements or notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 