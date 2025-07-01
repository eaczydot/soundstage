"use client"

import { useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw, TrendingUp, Users, Calendar, DollarSign } from "lucide-react"
import { useOptimizedFetch } from "@/hooks/use-optimized-fetch"
import { usePerformance, useInteractionTracking } from "@/hooks/use-performance"
import { formatCurrency, formatRelativeTime, memoize } from "@/lib/utils"
import { motion } from "framer-motion"

interface DashboardData {
  stats: {
    totalBookings: number
    totalRevenue: number
    totalUsers: number
    upcomingEvents: number
  }
  recentBookings: Array<{
    id: string
    venue: string
    date: string
    amount: number
    status: string
  }>
  revenueChart: Array<{
    month: string
    revenue: number
    bookings: number
  }>
}

// Memoized expensive calculations
const calculateGrowthRate = memoize((current: number, previous: number) => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
})

const processChartData = memoize((data: DashboardData['revenueChart']) => {
  return data.map(item => ({
    ...item,
    growth: calculateGrowthRate(item.revenue, item.revenue * 0.9) // Mock previous data
  }))
})

// Mock API call
const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    stats: {
      totalBookings: 156,
      totalRevenue: 45280,
      totalUsers: 89,
      upcomingEvents: 12
    },
    recentBookings: [
      {
        id: "1",
        venue: "Blue Note NYC",
        date: "2024-03-20T20:00:00Z",
        amount: 1500,
        status: "confirmed"
      },
      {
        id: "2", 
        venue: "Jazz Corner",
        date: "2024-03-22T21:00:00Z",
        amount: 800,
        status: "pending"
      },
      {
        id: "3",
        venue: "The Venue",
        date: "2024-03-25T19:30:00Z",
        amount: 1200,
        status: "confirmed"
      }
    ],
    revenueChart: [
      { month: 'Jan', revenue: 4000, bookings: 12 },
      { month: 'Feb', revenue: 3000, bookings: 10 },
      { month: 'Mar', revenue: 5000, bookings: 15 },
      { month: 'Apr', revenue: 4500, bookings: 13 },
      { month: 'May', revenue: 6000, bookings: 18 },
      { month: 'Jun', revenue: 5500, bookings: 16 },
    ]
  }
}

export function EnhancedDashboard() {
  // Performance monitoring
  const { getMetrics, markStart, markEnd } = usePerformance('EnhancedDashboard', {
    trackRerenders: true,
    trackMemory: true,
    threshold: 50 // Log if operations take longer than 50ms
  })

  // Interaction tracking
  const { trackClick, trackView } = useInteractionTracking()

  // Optimized data fetching with caching
  const { 
    data, 
    loading, 
    error, 
    refetch, 
    isStale 
  } = useOptimizedFetch(
    'dashboard-data',
    fetchDashboardData,
    {
      cacheTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 2 * 60 * 1000,  // 2 minutes
      refetchOnWindowFocus: true,
      retryAttempts: 3
    }
  )

  // Track page view
  useEffect(() => {
    trackView('Enhanced Dashboard')
  }, [trackView])

  // Memoized processed data
  const processedData = useMemo(() => {
    if (!data) return null
    
    markStart('data-processing')
    const processed = {
      ...data,
      revenueChart: processChartData(data.revenueChart)
    }
    markEnd('data-processing')
    
    return processed
  }, [data, markStart, markEnd])

  // Handle refresh
  const handleRefresh = () => {
    trackClick('refresh-dashboard')
    refetch()
  }

  // Loading skeleton
  if (loading && !data) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-20 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load dashboard data. {error.message}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="ml-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!processedData) return null

  const { stats, recentBookings, revenueChart } = processedData

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your bookings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isStale && (
            <span className="text-xs text-muted-foreground">Data may be outdated</span>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
              <p className="text-xs text-muted-foreground">
                Next 30 days
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => trackClick('booking-item', { bookingId: booking.id })}
                >
                  <div>
                    <p className="font-medium">{booking.venue}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatRelativeTime(booking.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(booking.amount)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Debug (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs text-muted-foreground">
              {JSON.stringify(getMetrics(), null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}