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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingSchema } from "@/lib/validators/booking-schema"
import { createBooking } from "@/lib/actions/bookings/create-booking"
import { toast } from "@/components/ui/use-toast"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: Date | null
}

interface BookingFormData {
  venue: string
  startTime: string
  endTime: string
  notes: string
  date: string
}

export function BookingDialog({ open, onOpenChange, date }: BookingDialogProps) {
  const form = useForm<BookingFormData>({
    defaultValues: {
      venue: '',
      startTime: '20:00',
      endTime: '23:00',
      notes: '',
      date: date?.toISOString().split('T')[0] || ''
    },
    resolver: zodResolver(bookingSchema)
  })

  const onSubmit = async (data: BookingFormData) => {
    try {
      await createBooking(data)
      toast.success('Booking created successfully')
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to create booking')
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Booking</DialogTitle>
          <DialogDescription>
            Create a new booking for {date?.toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="venue">Venue</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue-note">The Blue Note</SelectItem>
                <SelectItem value="jazz-corner">Jazz Corner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                defaultValue="20:00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="time"
                defaultValue="23:00"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              placeholder="Any special requirements or notes"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Create Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 