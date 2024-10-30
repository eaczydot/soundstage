import { format, formatDistance, parseISO, isValid, startOfDay, endOfDay } from 'date-fns'

export const formatDate = (date: string | Date | null, formatStr = 'PPP') => {
  if (!date) return ''
  const d = typeof date === 'string' ? parseISO(date) : date
  return isValid(d) ? format(d, formatStr) : 'Invalid date'
}

export const formatTime = (date: string | Date | null, formatStr = 'p') => {
  if (!date) return ''
  const d = typeof date === 'string' ? parseISO(date) : date
  return isValid(d) ? format(d, formatStr) : 'Invalid time'
}

export const formatRelative = (date: string | Date) => {
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistance(d, new Date(), { addSuffix: true })
}

export const getDateRange = (date: Date) => ({
  start: startOfDay(date),
  end: endOfDay(date)
})

export const isValidDate = (date: any): date is Date => {
  return date instanceof Date && isValid(date)
} 