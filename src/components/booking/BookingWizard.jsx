import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2, Minus, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { EVENT_TYPES, MENU_ITEMS } from '../../data/site'
import { EASE_OUT_EXPO } from '../../easing'
import { formatLongDate } from '../../lib/dates'
import { makeReference } from '../../lib/reference'
import MagneticButton from '../MagneticButton'
import ChoiceGroup from '../forms/ChoiceGroup'
import DatePicker from '../forms/DatePicker'
import Field from '../forms/Field'
import BookingSuccess from './BookingSuccess'
import BookingSummary from './BookingSummary'

const STEPS = [
  { label: 'Event', title: 'What are we cooking for?' },
  { label: 'Date', title: 'When and where?' },
  { label: 'Menu', title: 'What are we lighting up?' },
  { label: 'You', title: 'Who are we cooking for?' },
]
const LAST = STEPS.length - 1

const MIN_GUESTS = 10
const MAX_GUESTS = 300

const MENU_OPTIONS = MENU_ITEMS.map((item) => ({ id: item.name, label: item.name, blurb: item.note, Icon: item.Icon }))

const EMPTY = {
  type: '',
  date: '',
  guests: 40,
  venue: '',
  menu: [],
  dietary: '',
  name: '',
  email: '',
  phone: '',
  notes: '',
}

function validate(step, data) {
  const errors = {}
  if (step === 0 && !data.type) errors.type = 'Choose the kind of event so we can shape the menu.'
  if (step === 1) {
    if (!data.date) errors.date = 'Pick a date. Greyed-out days are unavailable.'
    if (data.guests < MIN_GUESTS) errors.guests = `We cater from ${MIN_GUESTS} guests.`
    if (!data.venue.trim()) errors.venue = 'Add a venue name or postcode.'
  }
  if (step === 2 && data.menu.length === 0) errors.menu = 'Choose at least one signature to build around.'
  if (step === 3) {
    if (!data.name.trim()) errors.name = 'Tell us your name.'
    if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) errors.email = 'Enter a valid email address.'
    if (data.phone.trim() && data.phone.replace(/\D/g, '').length < 7) errors.phone = 'That number looks too short.'
  }
  return errors
}

const slide = {
  enter: (direction) => ({ opacity: 0, x: direction * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction * -48 }),
}

function Stepper({ step }) {
  return (
    <ol className="mb-10 flex items-center" aria-label="Booking progress">
      {STEPS.map((item, index) => {
        const done = index < step
        const current = index === step
        return (
          <li key={item.label} className="flex flex-1 items-center last:flex-none" aria-current={current ? 'step' : undefined}>
            <span className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-500 ${
                  current
                    ? 'border-ember bg-ember text-white shadow-[0_0_24px_rgba(200,54,10,0.6)]'
                    : done
                      ? 'border-ember/60 bg-ember/20 text-emberGlow'
                      : 'border-white/15 text-ash/40'
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`hidden text-[11px] uppercase tracking-[0.26em] sm:block ${current ? 'text-ash' : 'text-ash/40'}`}
              >
                {item.label}
              </span>
            </span>
            {index < LAST && (
              <span className="relative mx-3 h-px flex-1 bg-white/10 sm:mx-5">
                <motion.span
                  className="absolute inset-0 origin-left bg-ember"
                  initial={false}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function GuestControl({ value, onChange, error }) {
  const clamp = (next) => onChange(Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, next)))
  const button =
    'flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ash transition-colors hover:border-ember disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow'

  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ash/55">
        Guests <span className="text-emberGlow">*</span>
      </p>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <button type="button" aria-label="Fewer guests" className={button} disabled={value <= MIN_GUESTS} onClick={() => clamp(value - 5)}>
            <Minus size={16} aria-hidden="true" />
          </button>
          <p className="font-serif text-5xl italic tracking-tight text-ash" aria-live="polite">
            {value}
          </p>
          <button type="button" aria-label="More guests" className={button} disabled={value >= MAX_GUESTS} onClick={() => clamp(value + 5)}>
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
        <input
          type="range"
          aria-label="Number of guests"
          min={MIN_GUESTS}
          max={MAX_GUESTS}
          step={5}
          value={value}
          onChange={(event) => clamp(Number(event.target.value))}
          className="mt-6 w-full accent-ember"
        />
        <div className="mt-1 flex justify-between text-[11px] text-ash/35">
          <span>{MIN_GUESTS}</span>
          <span>{MAX_GUESTS}+</span>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

export default function BookingWizard() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [reference, setReference] = useState('')
  const topRef = useRef(null)
  const headingRef = useRef(null)
  const timerRef = useRef(0)
  const mounted = useRef(false)

  const set = (key) => (value) => {
    setData((current) => ({ ...current, [key]: typeof value === 'function' ? value(current[key]) : value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  // Move focus to the new step heading, so keyboard and screen-reader users keep their place
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    headingRef.current?.focus({ preventScroll: true })
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const handleNext = () => {
    const found = validate(step, data)
    setErrors(found)
    if (Object.values(found).some(Boolean)) return
    goTo(step + 1)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (step < LAST) return handleNext()

    const found = validate(step, data)
    setErrors(found)
    if (Object.values(found).some(Boolean)) return undefined

    setSending(true)
    // DEMO: swap this timeout for a POST to the real booking endpoint
    timerRef.current = window.setTimeout(() => {
      setReference(makeReference('SB'))
      setSending(false)
    }, 1400)
    return undefined
  }

  if (reference) {
    const type = EVENT_TYPES.find((entry) => entry.id === data.type)
    return (
      <section className="mx-auto max-w-6xl px-6">
        <BookingSuccess
          reference={reference}
          title="Request received"
          lines={[
            `${type?.label ?? 'Your event'} for ${data.guests} guests on ${formatLongDate(data.date)}.`,
            `We will be in touch at ${data.email.trim()} to shape the menu and confirm your date.`,
            'For the fastest reply, send us a DM on Instagram.',
          ]}
        />
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-14">
        <div ref={topRef} className="scroll-mt-32">
          <Stepper step={step} />

          <form noValidate onSubmit={handleSubmit}>
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={step}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="space-y-8"
              >
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-serif text-3xl italic tracking-tight text-white/90 focus:outline-none md:text-5xl"
                >
                  {STEPS[step].title}
                </h2>

                {step === 0 && (
                  <ChoiceGroup label="Event type" options={EVENT_TYPES} value={data.type} onChange={set('type')} error={errors.type} />
                )}

                {step === 1 && (
                  <>
                    <DatePicker value={data.date} onChange={set('date')} error={errors.date} />
                    <GuestControl value={data.guests} onChange={set('guests')} error={errors.guests} />
                    <Field
                      label="Venue or postcode"
                      name="venue"
                      value={data.venue}
                      onChange={set('venue')}
                      error={errors.venue}
                      required
                      autoComplete="off"
                      placeholder="e.g. SL6, Maidenhead"
                      hint="We cook across Maidenhead and Berkshire."
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <ChoiceGroup
                      label="Build around (choose any)"
                      options={MENU_OPTIONS}
                      value={data.menu}
                      onChange={set('menu')}
                      multiple
                      error={errors.menu}
                    />
                    <Field
                      label="Dietary needs"
                      name="dietary"
                      value={data.dietary}
                      onChange={set('dietary')}
                      multiline
                      rows={3}
                      placeholder="Allergies, vegetarian guests, anything we should plan around"
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Name" name="name" value={data.name} onChange={set('name')} error={errors.name} required autoComplete="name" />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={set('email')}
                        error={errors.email}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={data.phone}
                      onChange={set('phone')}
                      error={errors.phone}
                      autoComplete="tel"
                      inputMode="tel"
                      hint="Optional, but handy for quick questions."
                    />
                    <Field
                      label="Anything else"
                      name="notes"
                      value={data.notes}
                      onChange={set('notes')}
                      multiline
                      rows={4}
                      placeholder="The occasion, the vibe, timings, access to the venue"
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-ash transition-colors hover:border-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
                >
                  <ArrowLeft size={14} aria-hidden="true" /> Back
                </button>
              ) : (
                <span />
              )}

              <MagneticButton>
                <button
                  type={step === LAST ? 'submit' : 'button'}
                  onClick={step === LAST ? undefined : handleNext}
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-full bg-ember px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(200,54,10,0.6)] disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
                >
                  {step === LAST ? (
                    sending ? (
                      <>
                        <Loader2 size={14} className="animate-spin" aria-hidden="true" /> Sending
                      </>
                    ) : (
                      'Send booking request'
                    )
                  ) : (
                    <>
                      Continue <ArrowRight size={14} aria-hidden="true" />
                    </>
                  )}
                </button>
              </MagneticButton>
            </div>
          </form>
        </div>

        <div className="lg:sticky lg:top-32">
          <BookingSummary data={data} />
        </div>
      </div>
    </section>
  )
}
