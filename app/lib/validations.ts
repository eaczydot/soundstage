import * as z from 'zod'

export const bookingSchema = z.object({
  venue: z.string().min(1, 'Venue is required'),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  notes: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  setupTemplateId: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
}).refine(data => {
  const start = new Date(`${data.date}T${data.startTime}`)
  const end = new Date(`${data.date}T${data.endTime}`)
  return end > start
}, {
  message: "End time must be after start time",
  path: ["endTime"]
})

export const setupTemplateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  equipment: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['instrument', 'sound', 'lighting', 'stage', 'other']),
    quantity: z.number().min(1)
  })),
  stageLayout: z.record(z.any()).optional(),
  requirements: z.array(z.string()).optional()
})

export const paymentScheduleSchema = z.object({
  type: z.enum(['automatic', 'threshold', 'manual']),
  frequency: z.enum(['weekly', 'biweekly', 'monthly']).optional(),
  threshold: z.number().min(100).optional(),
  instantPayouts: z.boolean(),
  paymentMethod: z.object({
    type: z.enum(['bank_account', 'paypal', 'other']),
    details: z.record(z.string())
  })
}) 