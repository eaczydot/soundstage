"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { useToast } from "@/hooks/use-toast"

export function VenueForm() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Success",
      description: "Venue has been added",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Venue</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Venue Name</Label>
            <Input required />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input required />
          </div>

          <div className="space-y-2">
            <Label>Capacity</Label>
            <Input type="number" min={0} required />
          </div>

          <div className="space-y-2">
            <Label>Primary Genre</Label>
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
            <Label>Description</Label>
            <Textarea 
              placeholder="Describe the venue..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Amenities</Label>
            <Textarea 
              placeholder="List available amenities..."
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Add Venue
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 