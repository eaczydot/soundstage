'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Calendar, DollarSign, Clock } from "lucide-react"

export function PayoutScheduling() {
  const [scheduleType, setSchedululeType] = useState("automatic")
  const [frequency, setFrequency] = useState("monthly")
  const [threshold, setThreshold] = useState("500")
  const [instantPayouts, setInstantPayouts] = useState(false)

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Payout Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure how and when you receive your payments
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Payout Method</Label>
          <Select value={scheduleType} onValueChange={setSchedululeType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">Automatic Schedule</SelectItem>
              <SelectItem value="threshold">Payment Threshold</SelectItem>
              <SelectItem value="manual">Manual Payout</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {scheduleType === "automatic" && (
          <div className="space-y-2">
            <Label>Payout Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {scheduleType === "threshold" && (
          <div className="space-y-2">
            <Label>Minimum Payout Amount ($)</Label>
            <Input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              min="100"
              step="100"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Instant Payouts</Label>
            <p className="text-sm text-muted-foreground">
              Enable instant transfers for a 1% fee
            </p>
          </div>
          <Switch
            checked={instantPayouts}
            onCheckedChange={setInstantPayouts}
          />
        </div>
      </div>

      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Next Payout Date</p>
              <p className="text-sm text-muted-foreground">March 31, 2024</p>
            </div>
          </div>
          <Button variant="outline">Request Early</Button>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Pending Balance</p>
              <p className="text-sm text-muted-foreground">$1,250.00</p>
            </div>
          </div>
          <Button>Withdraw Now</Button>
        </div>
      </div>
    </Card>
  )
} 