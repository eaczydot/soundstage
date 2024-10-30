import * as z from "zod"

export const bookingSchema = z.object({
  venue: z.string().min(1, "Venue is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  duration: z.number().min(1, "Duration is required"),
  notes: z.string().optional(),
})

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  venue: z.string().min(1, "Venue is required"),
  description: z.string().optional(),
  capacity: z.number().min(1, "Capacity is required"),
}) 