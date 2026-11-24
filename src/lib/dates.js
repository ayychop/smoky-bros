// Captured once at load, so renders stay pure
const NOW = new Date()
export const TODAY = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate())

const pad = (n) => String(n).padStart(2, '0')

export const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`

export function formatLongDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// DEMO ONLY: a deterministic scatter of "already booked" weekend dates so the calendar feels live.
// Replace with real availability from the booking backend.
export function isDemoBooked(y, m, d) {
  const day = new Date(y, m, d).getDay()
  if (day !== 5 && day !== 6 && day !== 0) return false
  const value = Math.sin((y * 400 + m * 31 + d) * 12.9898) * 43758.5453
  return value - Math.floor(value) > 0.78
}
