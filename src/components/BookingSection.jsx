import { motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENT_TYPES } from '../data/site'
import { EASE_OUT_EXPO } from '../easing'
import { TODAY, toISO } from '../lib/dates'
import { makeReference } from '../lib/reference'
import FlameBro from './FlameBro'
import MagneticButton from './MagneticButton'
import { ExitSign } from './RoadSign'
import Scallop from './Scallop'
import Smoke from './Smoke'

const FIELD =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-ink transition-all outline-none placeholder:text-ink/35 focus:border-ember focus:ring-2 focus:ring-ember/30'
const LABEL = 'font-cond mb-1.5 block text-xs tracking-[0.24em] text-ink/70'

const MIN_DATE = toISO(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())

function Field({ label, id, children }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      {children}
    </div>
  )
}

export default function BookingSection() {
  const [sent, setSent] = useState(null)

  const onSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setSent({ name: String(data.get('name')).split(' ')[0], reference: makeReference('BK') })
  }

  return (
    <section id="book" className="relative isolate scroll-mt-0 overflow-hidden bg-ink px-6 pb-20 pt-32 text-white md:pb-24 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_20%_100%,rgba(200,54,10,0.32),transparent_70%),radial-gradient(50%_50%_at_90%_0%,rgba(200,54,10,0.25),transparent_70%)]" />
      <Smoke tone="dark" plumes={4} wisps={4} />
      <Scallop />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
        >
          <ExitSign exit="06" className="text-white">
            Bookings open for 2027
          </ExitSign>
          <h2 className="mt-5 font-display text-6xl leading-[0.98] text-white md:text-8xl">
            <span className="sr-only">Book the Bros</span>
            <span aria-hidden="true" className="block">Book</span>
            <span aria-hidden="true" className="block">the Bros</span>
          </h2>
          <p className="mt-6 font-display text-2xl leading-tight text-sun md:text-4xl">Let&apos;s make your event legendary</p>
          <p className="font-lead mt-6 max-w-md text-[1.4rem] leading-[1.4] text-white/85">
            Tell us a little about the day and we will come back with a menu, a plan and a warm welcome.
          </p>
          <div className="mt-7 flex items-center gap-4">
            <Link
              to="/book"
              className="inline-block rounded-full border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun"
            >
              Plan it step by step
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative rounded-2xl bg-cream p-7 text-ink shadow-sticker-lg md:p-9"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE_OUT_EXPO }}
        >
          <FlameBro alive className="pointer-events-none absolute -top-[6.2rem] right-6 z-10 h-28 w-auto md:-top-[7.2rem] md:right-10 md:h-32" glow={false} />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-chili via-sun to-chili" />

          {sent ? (
            <div className="flex min-h-[26rem] flex-col items-center justify-center text-center" role="status">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-chili">
                <Check size={28} aria-hidden="true" className="text-white" strokeWidth={2.5} />
              </span>
              <h3 className="mt-6 font-display text-3xl text-ink">Thanks {sent.name}, you are on the list</h3>
              <p className="mt-4 max-w-sm text-ink/70">
                Your reference is <span className="rounded bg-ink px-2 py-0.5 font-semibold text-sun">{sent.reference}</span>. The Bros will be in touch soon to talk menus and dates.
              </p>
              <button
                type="button"
                onClick={() => setSent(null)}
                className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-chili underline underline-offset-8 hover:text-ink"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <Field label="Name" id="bk-name">
                <input id="bk-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={FIELD} />
              </Field>
              <Field label="Email" id="bk-email">
                <input id="bk-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={FIELD} />
              </Field>
              <Field label="Event type" id="bk-type">
                <div className="relative">
                  <select id="bk-type" name="type" required defaultValue="" className={`${FIELD} cursor-pointer appearance-none pr-10`}>
                    <option value="" disabled>
                      Choose an event
                    </option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/60" strokeWidth={2} />
                </div>
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Date" id="bk-date">
                  <input id="bk-date" name="date" type="date" required min={MIN_DATE} className={FIELD} />
                </Field>
                <Field label="Guest count" id="bk-guests">
                  <input id="bk-guests" name="guests" type="number" required min="1" max="2000" inputMode="numeric" placeholder="How many" className={FIELD} />
                </Field>
              </div>

              <div className="pt-2">
                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-chili px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame hover:shadow-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
                  >
                    Book the Bros
                  </button>
                </MagneticButton>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
