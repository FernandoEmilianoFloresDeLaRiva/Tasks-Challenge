import { ref } from 'vue'

/**
 * Formatea una fecha a string local (dd/mm/aaaa)
 * @param date Fecha en string o Date
 * @returns Fecha formateada
 */
export function formatDate(date?: string | Date): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString()
}

/**
 * Obtiene la fecha de hoy en formato yyyy-mm-dd
 * @returns Fecha de hoy como string
 */
export function getToday(): string {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
} 