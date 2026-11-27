import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../../data/site'
import { EASE_OUT_EXPO } from '../../easing'
import MagneticButton from '../MagneticButton'

// Shared confirmation screen for both the booking and enquiry flows
export default function BookingSuccess({ reference, title, lines }) {
  return (
    <motion.div
      className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-ink bg-cream px-6 py-14 text-center shadow-sticker-lg md:px-14 md:py-16"
      initial={{ opacity: 0, y: 32, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO }}
    >
      <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 opacity-40" />
      <motion.span
        className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-ink bg-sun shadow-sticker"
        initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 13, delay: 0.2 }}
      >
        <Check size={44} strokeWidth={3.2} aria-hidden="true" className="text-ink" />
      </motion.span>

      <h2 className="relative mt-8 font-display text-4xl text-ink md:text-5xl">{title}</h2>
      <p className="relative mt-4 inline-block  rounded-md bg-ink px-3 py-1.5 font-marker text-lg text-sun">Reference {reference}</p>

      <ul className="relative mx-auto mt-7 max-w-md space-y-2 text-base font-medium leading-relaxed text-ink/80">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <MagneticButton>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-ink bg-chili px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-cream shadow-sticker transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sticker-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            DM {INSTAGRAM_HANDLE}
          </a>
        </MagneticButton>
        <MagneticButton>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-ink bg-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-ink shadow-sticker transition-all duration-200 hover:-translate-y-0.5 hover:bg-sun focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Back to home
          </Link>
        </MagneticButton>
      </div>
    </motion.div>
  )
}
