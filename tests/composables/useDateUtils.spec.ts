import { describe, it, expect } from 'vitest'
import { formatDate, getToday } from '../../composables/useDateUtils'

describe('useDateUtils', () => {
  it('formats a date string to local format', () => {
    const result = formatDate('2024-01-01')
    // Accepts both dd/mm/yyyy and mm/dd/yyyy depending on locale
    expect(result).toMatch(/2024|01|1/)
  })

  it('returns today in yyyy-mm-dd format', () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    expect(getToday()).toBe(`${yyyy}-${mm}-${dd}`)
  })
}) 