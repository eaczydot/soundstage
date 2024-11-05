"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function PerformanceForm() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Success",
      description: "Performance has been scheduled",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Performance title..." required />
          </div>

          <div className="space-y-2">
            <Label>Venue</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue-note">The Blue Note</SelectItem>
                <SelectItem value="electric-ballroom">Electric Ballroom</SelectItem>
                <SelectItem value="jazz-cafe">Jazz Cafe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Date</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="19:00">7:00 PM</SelectItem>
                  <SelectItem value="20:00">8:00 PM</SelectItem>
                  <SelectItem value="21:00">9:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Genre</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jazz">Jazz</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="classical">Classical</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fee ($)</Label>
            <Input type="number" min={0} required />
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea 
              placeholder="Additional details, requirements, etc..."
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Schedule Performance
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 