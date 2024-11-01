"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loading } from "@/components/ui/loading"

export function BookingForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date>()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: "Booking request has been sent",
      })
      
      router.push("/bookings")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="venue">Venue</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select venue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue-note">The Blue Note</SelectItem>
              <SelectItem value="jazz-corner">Jazz Corner</SelectItem>
              <SelectItem value="village-vanguard">Village Vanguard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="18:00">6:00 PM</SelectItem>
              <SelectItem value="19:00">7:00 PM</SelectItem>
              <SelectItem value="20:00">8:00 PM</SelectItem>
              <SelectItem value="21:00">9:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (hours)</Label>
          <Input type="number" min={1} max={4} defaultValue={2} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea 
            placeholder="Any special requirements or requests..."
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loading className="mr-2" /> : null}
          {loading ? "Submitting..." : "Submit Booking Request"}
        </Button>
      </form>
    </Card>
  )
} 