import { EVENT_TYPES, MENU_ITEMS, PRICE_FROM } from '../../data/site'
import { formatLongDate } from '../../lib/dates'

function estimateFor(data) {
  if (data.type === 'street') return { label: 'Priced per event', detail: 'We will quote your pop-up once we know the format.' }
  if (!data.type) return { label: `From £${PRICE_FROM} a head`, detail: 'Pick an event type to see a guide price.' }
  const total = data.guests * PRICE_FROM
  return {
    label: `From £${total.toLocaleString('en-GB')}`,
    detail: `${data.guests} guests at £${PRICE_FROM} a head. A guide only, the final quote follows your request.`,
  }
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-white/10 py-4 last:border-b-0">
      <dt className="text-[11px] uppercase tracking-[0.26em] text-ash/45">{label}</dt>
      <dd className={`max-w-[60%] text-right text-sm ${value ? 'text-ash' : 'text-ash/25'}`}>{value || 'Not chosen yet'}</dd>
    </div>
  )
}

export default function BookingSummary({ data }) {
  const type = EVENT_TYPES.find((entry) => entry.id === data.type)
  const menu = MENU_ITEMS.filter((item) => data.menu.includes(item.name)).map((item) => item.name)
  const estimate = estimateFor(data)

  return (
    <aside
      aria-label="Booking summary"
      className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,77,28,0.28)_0%,transparent_70%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <p className="relative text-xs uppercase tracking-[0.34em] text-emberGlow">Your booking</p>
      <dl className="relative mt-4">
        <Row label="Event" value={type?.label} />
        <Row label="Date" value={formatLongDate(data.date)} />
        <Row label="Guests" value={String(data.guests)} />
        <Row label="Venue" value={data.venue.trim()} />
        <Row label="Menu" value={menu.join(', ')} />
      </dl>
      <div className="relative mt-6 rounded-2xl border border-ember/30 bg-ember/10 p-5">
        <p className="text-[11px] uppercase tracking-[0.26em] text-ash/50">Guide price</p>
        <p className="mt-2 font-serif text-3xl tracking-tight text-ash">{estimate.label}</p>
        <p className="mt-2 text-xs leading-relaxed text-ash/50">{estimate.detail}</p>
      </div>
    </aside>
  )
}
