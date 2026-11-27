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
  { label: 'Menu', title: 'What are we cooking up?' },
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
    if (!data.date) errors.date = 'Pick a date. Greyed out days are unavailable.'
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

function Stepper({ step, complete, furthest, onGo }) {
  return (
    <ol className="mb-10 flex items-center" aria-label="Booking progress">
      {STEPS.map((item, index) => {
        const current = index === step
        const done = complete[index] && !current
        const locked = index > furthest
        return (
          <li key={item.label} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              onClick={() => onGo(index)}
              aria-current={current ? 'step' : undefined}
              aria-disabled={locked || undefined}
              aria-label={`${locked ? 'Locked, finish the earlier steps first. ' : ''}Step ${index + 1}, ${item.label}${done ? ', completed' : ''}`}
              title={locked ? 'Finish the earlier steps first' : `Go to ${item.label}`}
              className={`group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember ${
                locked ? 'cursor-not-allowed' : current ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-extrabold transition-all duration-500 ${
                  current
                    ? 'border-ink bg-chili text-cream shadow-sticker'
                    : done
                      ? 'border-ink bg-sun text-ink group-hover:-translate-y-0.5 group-hover:shadow-sticker'
                      : locked
                        ? 'border-ink/25 bg-white text-ink/35'
                        : 'border-ink/60 bg-white text-ink group-hover:-translate-y-0.5 group-hover:border-ink group-hover:shadow-sticker'
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`hidden text-xs font-extrabold uppercase tracking-[0.2em] transition-colors duration-300 sm:block ${
                  current ? 'text-ink' : locked ? 'text-ink/35' : 'text-ink/60 group-hover:text-ink'
                }`}
              >
                {item.label}
              </span>
            </button>
            {index < LAST && (
              <span aria-hidden="true" className="relative mx-3 h-1 flex-1 rounded-full bg-ink/15 sm:mx-5">
                <motion.span
                  className="absolute inset-0 origin-left rounded-full bg-chili"
                  initial={false}
                  animate={{ scaleX: complete[index] ? 1 : 0 }}
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
    'flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-cream text-ink transition-colors hover:bg-sun disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chili'

  return (
    <div>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-ink">
        Guests <span className="text-chili">*</span>
      </p>
      <div className="rounded-2xl border border-ink bg-white p-5 shadow-sticker sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <button type="button" aria-label="Fewer guests" className={button} disabled={value <= MIN_GUESTS} onClick={() => clamp(value - 5)}>
            <Minus size={16} aria-hidden="true" />
          </button>
          <p className="font-display text-5xl text-ink" aria-live="polite">
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
          className="mt-6 w-full accent-chili"
        />
        <div className="mt-1 flex justify-between text-xs font-semibold text-ink/55">
          <span>{MIN_GUESTS}</span>
          <span>{MAX_GUESTS}+</span>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm font-bold text-chili">
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
    setErrors({})
    setStep(next)
  }

  // A step is complete when it has no validation errors. You can always go back, and you can
  // jump forward as far as the first step that is still missing something.
  const complete = STEPS.map((_, index) => !Object.values(validate(index, data)).some(Boolean))
  let furthest = 0
  while (furthest < LAST && complete[furthest]) furthest += 1

  const handleStepClick = (target) => {
    if (target === step) return
    if (target < step || target <= furthest) {
      goTo(target)
      return
    }
    // Locked: show what is missing here, or take them to the first incomplete step
    if (furthest === step) setErrors(validate(step, data))
    else goTo(furthest)
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
          <Stepper step={step} complete={complete} furthest={furthest} onGo={handleStepClick} />

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
                  className="font-display text-3xl text-ink focus:outline-none md:text-5xl"
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
                  className="inline-flex items-center gap-2 rounded-full border border-ink bg-cream px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-ink shadow-sticker transition-all duration-200 hover:-translate-y-0.5 hover:bg-sun focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chili"
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
                  className="inline-flex items-center gap-2 rounded-full border border-ink bg-chili px-8 py-4 text-xs font-extrabold uppercase tracking-[0.18em] text-cream shadow-sticker transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sticker-lg disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
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
