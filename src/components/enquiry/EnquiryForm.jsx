import { Flame, Handshake, Loader2, MessageCircle, Store } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { makeReference } from '../../lib/reference'
import BookingSuccess from '../booking/BookingSuccess'
import ChoiceGroup from '../forms/ChoiceGroup'
import Field from '../forms/Field'
import MagneticButton from '../MagneticButton'

const TOPICS = [
  { id: 'private', label: 'Private catering', blurb: 'An event at home or a venue.', Icon: Flame },
  { id: 'street', label: 'Street food', blurb: 'Pop ups, markets and launches', Icon: Store },
  { id: 'partnership', label: 'Partnership', blurb: 'Collabs, residencies, brands.', Icon: Handshake },
  { id: 'other', label: 'Something else', blurb: 'Questions, ideas, anything.', Icon: MessageCircle },
]

const EMPTY = { topic: '', name: '', email: '', phone: '', message: '' }

function validate(data) {
  const errors = {}
  if (!data.topic) errors.topic = 'Choose what this is about.'
  if (!data.name.trim()) errors.name = 'Tell us your name.'
  if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) errors.email = 'Enter a valid email address.'
  if (data.phone.trim() && data.phone.replace(/\D/g, '').length < 7) errors.phone = 'That number looks too short.'
  if (data.message.trim().length < 10) errors.message = 'Give us a little more detail, a sentence or two is plenty.'
  return errors
}

export default function EnquiryForm() {
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [reference, setReference] = useState('')
  const timerRef = useRef(0)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const set = (key) => (value) => {
    setData((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(data)
    setErrors(found)
    if (Object.values(found).some(Boolean)) return

    setSending(true)
    // DEMO: swap this timeout for a POST to the real enquiry endpoint
    timerRef.current = window.setTimeout(() => {
      setReference(makeReference('EN'))
      setSending(false)
    }, 1200)
  }

  if (reference) {
    return (
      <BookingSuccess
        reference={reference}
        title="Message received"
        lines={[
          `Thanks ${data.name.trim().split(' ')[0]}, we have your enquiry.`,
          `We will reply to ${data.email.trim()} as soon as we can.`,
          'For the fastest reply, send us a DM on Instagram.',
        ]}
      />
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-8">
      <ChoiceGroup label="What is this about?" options={TOPICS} value={data.topic} onChange={set('topic')} error={errors.topic} />

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
        hint="Optional."
      />
      <Field
        label="Message"
        name="message"
        value={data.message}
        onChange={set('message')}
        error={errors.message}
        required
        multiline
        rows={6}
        placeholder="Tell us about your event, your idea or your question"
      />

      <MagneticButton>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-full border border-ink bg-chili px-10 py-4 text-xs font-extrabold uppercase tracking-[0.18em] text-cream shadow-sticker transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sticker-lg disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {sending ? (
            <>
              <Loader2 size={14} className="animate-spin" aria-hidden="true" /> Sending
            </>
          ) : (
            'Send enquiry'
          )}
        </button>
      </MagneticButton>
    </form>
  )
}
