export interface User {
  id: string
  name: string
  email: string
  role: 'musician' | 'venue_manager' | 'admin'
  avatar?: string
  preferences?: UserPreferences
}

export interface UserPreferences {
  notifications: NotificationPreferences
  defaultSetup?: string // Reference to a SetupTemplate
  payoutSchedule?: PayoutSchedule
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  bookingReminders: boolean
  paymentAlerts: boolean
  marketingUpdates: boolean
}

export interface PayoutSchedule {
  frequency: 'weekly' | 'monthly' | 'manual'
  dayOfWeek?: number // 0-6 for weekly
  dayOfMonth?: number // 1-31 for monthly
  minimumAmount?: number
}

export interface Booking {
  id: string
  venueId: string
  musicianId: string
  date: string
  startTime: string
  endTime: string
  status: BookingStatus
  notes?: string
  amount: number
  setupTemplate?: string
  requirements?: string[]
  tags?: string[]
  contract?: ContractStatus
  payment?: PaymentStatus
}

export type BookingStatus = 'draft' | 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type ContractStatus = 'not_started' | 'draft' | 'pending' | 'signed' | 'expired'
export type PaymentStatus = 'not_started' | 'pending' | 'completed' | 'failed'

export interface Venue {
  id: string
  name: string
  address: string
  capacity: number
  equipment: Equipment[]
  requirements: VenueRequirement[]
  amenities: string[]
  contacts: Contact[]
}

export interface Equipment {
  id: string
  name: string
  type: EquipmentType
  status: 'available' | 'unavailable' | 'maintenance'
  specifications?: Record<string, string>
}

export interface VenueRequirement {
  id: string
  name: string
  required: boolean
  description?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  role: string
}

export type EquipmentType = 'instrument' | 'sound' | 'lighting' | 'stage' | 'other'