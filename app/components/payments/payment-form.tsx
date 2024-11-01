"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loading } from "@/components/ui/loading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function PaymentForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Success",
        description: "Payment has been processed",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Payment failed. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">Credit Card</SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Amount</Label>
          <Input type="number" min={0} required />
        </div>

        <div className="space-y-2">
          <Label>Card Number</Label>
          <Input placeholder="**** **** **** ****" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <Input placeholder="MM/YY" required />
          </div>
          <div className="space-y-2">
            <Label>CVC</Label>
            <Input placeholder="***" required />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loading className="mr-2" /> : null}
          {loading ? "Processing..." : "Process Payment"}
        </Button>
      </form>
    </Card>
  )
} 