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
      className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-16 text-center backdrop-blur-xl md:px-14 md:py-20"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,77,28,0.3)_0%,transparent_65%)]"
      />
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-emberGlow blur-2xl"
          animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="relative flex h-24 w-24 items-center justify-center rounded-full border border-ember bg-ember/20 text-white"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <Check size={38} strokeWidth={1.8} aria-hidden="true" />
        </motion.span>
      </div>

      <h2 className="relative mt-10 font-serif text-4xl italic tracking-tight text-white/90 md:text-5xl">{title}</h2>
      <p className="relative mt-4 text-xs uppercase tracking-[0.34em] text-emberGlow">Reference {reference}</p>

      <ul className="relative mx-auto mt-8 max-w-md space-y-2 text-base leading-relaxed text-ash/65">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className="relative mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <MagneticButton>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-ember px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(200,54,10,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
          >
            DM {INSTAGRAM_HANDLE}
          </a>
        </MagneticButton>
        <MagneticButton>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-ash transition-colors duration-300 hover:border-ember hover:bg-ember/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
          >
            Back to home
          </Link>
        </MagneticButton>
      </div>
    </motion.div>
  )
}
