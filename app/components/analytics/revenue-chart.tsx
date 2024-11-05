"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts'
import { formatCurrency } from "@/lib/utils"

const data = [
  { month: 'Jan', revenue: 4000, bookings: 24 },
  { month: 'Feb', revenue: 3000, bookings: 18 },
  { month: 'Mar', revenue: 5000, bookings: 29 },
  { month: 'Apr', revenue: 4500, bookings: 26 },
  { month: 'May', revenue: 6000, bookings: 32 },
  { month: 'Jun', revenue: 5500, bookings: 30 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Bookings Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                yAxisId="left"
                tickFormatter={(value) => formatCurrency(value)}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                tickFormatter={(value) => `${value} bookings`}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') return formatCurrency(Number(value))
                  return `${value} bookings`
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Revenue"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="bookings" 
                stroke="#16a34a" 
                strokeWidth={2}
                name="Bookings"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 