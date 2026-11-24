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
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ash/55">
        Event date <span className="text-emberGlow">*</span>
      </p>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            disabled={atEarliest}
            onClick={() => step(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ash transition-colors hover:border-ember disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <p aria-live="polite" className="font-serif text-xl tracking-tight text-ash">
            {MONTHS[cursor.m]} {cursor.y}
          </p>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => step(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ash transition-colors hover:border-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-[0.2em] text-ash/35">
          {WEEKDAYS.map((day) => (
            <span key={day} className="py-2">
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
                className={`relative aspect-square rounded-full text-sm transition-[background-color,color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emberGlow ${
                  selected
                    ? 'bg-ember font-semibold text-white shadow-[0_0_24px_rgba(200,54,10,0.65)]'
                    : disabled
                      ? 'cursor-not-allowed text-ash/20'
                      : 'text-ash hover:bg-ember/20 hover:text-white'
                } ${booked ? 'line-through' : ''}`}
              >
                {day}
              </button>
            )
          })}
        </div>

        <p className="mt-5 flex items-center gap-4 text-[11px] text-ash/40">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-ember" /> Selected
          </span>
          <span className="flex items-center gap-2">
            <span className="h-px w-3 bg-ash/40" /> Unavailable
          </span>
        </p>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}
