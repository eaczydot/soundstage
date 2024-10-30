export interface Booking {
  id: number | string
  venue: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  amount?: number
  requirements?: string[]
} 