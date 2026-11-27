import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { formatLongDate, isDemoBooked, TODAY, toISO } from '../../lib/dates'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function DatePicker({ value, onChange, error }) {
  const initial = value ? new Date(value) : TODAY
  const [cursor, setCursor] = useState({ y: initial.getFullYear(), m: initial.getMonth() })

  const firstWeekday = (new Date(cursor.y, cursor.m, 1).getDay() + 6) % 7
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate()
  const cells = [...Array.from({ length: firstWeekday }, () => null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const atEarliest = cursor.y === TODAY.getFullYear() && cursor.m === TODAY.getMonth()
  const step = (delta) => {
    const next = new Date(cursor.y, cursor.m + delta, 1)
    setCursor({ y: next.getFullYear(), m: next.getMonth() })
  }

  return (
    <div>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-ink">
        Event date <span className="text-chili">*</span>
      </p>
      <div className="rounded-2xl border border-ink bg-white p-5 shadow-sticker sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            disabled={atEarliest}
            onClick={() => step(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink bg-cream text-ink transition-colors hover:bg-sun disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chili"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <p aria-live="polite" className="font-display text-xl text-ink">
            {MONTHS[cursor.m]} {cursor.y}
          </p>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => step(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink bg-cream text-ink transition-colors hover:bg-sun focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chili"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink/60">
          {WEEKDAYS.map((day) => (
            <span key={day} className="py-2 pl-[0.16em]">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, index) => {
            if (!day) return <span key={`gap-${index}`} />
            const iso = toISO(cursor.y, cursor.m, day)
            const past = new Date(cursor.y, cursor.m, day) <= TODAY
            const booked = !past && isDemoBooked(cursor.y, cursor.m, day)
            const selected = value === iso
            const disabled = past || booked
            return (
              <button
                key={iso}
                type="button"
                disabled={disabled}
                aria-pressed={selected}
                aria-label={`${formatLongDate(iso)}${booked ? ', unavailable' : ''}`}
                onClick={() => onChange(iso)}
                className={`relative aspect-square rounded-full text-sm transition-[background-color,color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili ${
 selected
                    ? 'border border-ink bg-chili font-bold text-cream shadow-sticker'
                    : disabled
                      ? 'cursor-not-allowed text-ink/25'
                      : 'font-semibold text-ink hover:bg-sun'
                } ${booked ? 'line-through' : ''}`}
              >
                {day}
              </button>
            )
          })}
        </div>

        <p className="mt-5 flex items-center gap-4 text-xs font-semibold text-ink/65">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-ink bg-chili" /> Selected
          </span>
          <span className="flex items-center gap-2">
            <span className="h-[2px] w-3 bg-ink/50" /> Unavailable
          </span>
        </p>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm font-bold text-chili">
          {error}
        </p>
      )}
    </div>
  )
}
