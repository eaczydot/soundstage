export interface Booking {
  id: number | string
  venue: string
  date: string
  time: string
  status: BookingStatus
  amount?: number
  notes?: string
  requirements?: string[]
  venueId?: string
  musicianId?: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface BookingFormData {
  venue: string
  date: string
  time: string
  notes?: string
}

export interface VenueRequirement {
  id: string
  name: string
  required: boolean
  description?: string
} 