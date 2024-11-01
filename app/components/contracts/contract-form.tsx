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

export function ContractForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Success",
        description: "Contract has been created",
      })
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
          <Label>Contract Type</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Performance</SelectItem>
              <SelectItem value="residency">Residency</SelectItem>
              <SelectItem value="special">Special Event</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Payment Terms</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flat">Flat Rate</SelectItem>
              <SelectItem value="percentage">Percentage of Sales</SelectItem>
              <SelectItem value="hybrid">Hybrid Model</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Amount</Label>
          <Input type="number" min={0} required />
        </div>

        <div className="space-y-2">
          <Label>Performance Requirements</Label>
          <Textarea 
            placeholder="List any specific requirements..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Additional Terms</Label>
          <Textarea 
            placeholder="Any additional terms or conditions..."
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loading className="mr-2" /> : null}
          {loading ? "Creating..." : "Create Contract"}
        </Button>
      </form>
    </Card>
  )
} 