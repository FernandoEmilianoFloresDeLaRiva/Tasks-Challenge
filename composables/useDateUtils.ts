import { ref } from 'vue'

/**
 * Format a date to a local string (dd/mm/yyyy)
 * @param date Date as string or Date object
 * @returns Formatted date string
 */
export function formatDate(date?: string | Date): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString()
}

/**
 * Get today's date in yyyy-mm-dd format
 * @returns Today's date as string
 */
export function getToday(): string {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
} 