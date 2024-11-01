'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function PayoutScheduling() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="automatic-payouts">Automatic Payouts</Label>
          <Switch id="automatic-payouts" />
        </div>
        
        <div className="space-y-2">
          <Label>Payout Frequency</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="instant-payouts">Enable Instant Payouts</Label>
          <Switch id="instant-payouts" />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="payment-notifications">Payment Notifications</Label>
          <Switch id="payment-notifications" defaultChecked />
        </div>
      </CardContent>
    </Card>
  )
} 