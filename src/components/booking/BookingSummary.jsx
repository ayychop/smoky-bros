import { EVENT_TYPES, MENU_ITEMS } from '../../data/site'
import { formatLongDate } from '../../lib/dates'

function estimateFor(data) {
  if (data.type === 'street') return { label: 'Bespoke Quotes', detail: 'We will quote your pop up once we know the format.' }
  if (!data.type) return { label: 'Bespoke Quotes', detail: 'Every event is priced around your guests and your menu.' }
  return {
    label: 'Bespoke Quotes',
    detail: `Cooked around ${data.guests} guests. Your personal quote follows your request.`,
  }
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-dashed border-cream/25 py-4 last:border-b-0">
      <dt className="text-xs font-extrabold uppercase tracking-[0.2em] text-cream/75">{label}</dt>
      <dd className={`max-w-[60%] text-right text-sm font-semibold ${value ? 'text-cream' : 'text-cream/45'}`}>{value || 'Not chosen yet'}</dd>
    </div>
  )
}

export default function BookingSummary({ data }) {
  const type = EVENT_TYPES.find((entry) => entry.id === data.type)
  const menu = MENU_ITEMS.filter((item) => data.menu.includes(item.name)).map((item) => item.name)
  const estimate = estimateFor(data)

  return (
    <aside aria-label="Booking summary" className="relative overflow-hidden rounded-3xl border border-ink bg-teal p-7 text-cream shadow-sticker">
      <div aria-hidden="true" className="halftone-light pointer-events-none absolute inset-0 opacity-60" />
      <p className="relative inline-block  bg-sun px-3 py-1 font-marker text-lg text-ink">Your booking</p>
      <dl className="relative mt-4">
        <Row label="Event" value={type?.label} />
        <Row label="Date" value={formatLongDate(data.date)} />
        <Row label="Guests" value={String(data.guests)} />
        <Row label="Venue" value={data.venue.trim()} />
        <Row label="Menu" value={menu.join(', ')} />
      </dl>
      <div className="relative mt-6 rounded-2xl border border-ink bg-sun p-5 text-ink shadow-sticker">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/75">Your quote</p>
        <p className="mt-2 font-display text-3xl">{estimate.label}</p>
        <p className="mt-2 text-xs font-medium leading-relaxed text-ink/80">{estimate.detail}</p>
      </div>
    </aside>
  )
}
