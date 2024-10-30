export interface Booking {
  id: string | number
  venue: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'cancelled'
  notes?: string
  amount?: number
} 