"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loading } from "@/components/ui/loading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CampaignForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Success",
        description: "Campaign has been created",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create campaign. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Campaign Type</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select campaign type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email Campaign</SelectItem>
              <SelectItem value="social">Social Media Campaign</SelectItem>
              <SelectItem value="event">Event Promotion</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Campaign Name</Label>
          <Input required />
        </div>

        <div className="space-y-2">
          <Label>Target Audience</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subscribers</SelectItem>
              <SelectItem value="active">Active Customers</SelectItem>
              <SelectItem value="inactive">Inactive Customers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Campaign Content</Label>
          <Textarea 
            placeholder="Write your campaign content..."
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Schedule</Label>
          <Input type="datetime-local" required />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loading className="mr-2" /> : null}
          {loading ? "Creating..." : "Create Campaign"}
        </Button>
      </form>
    </Card>
  )
} 