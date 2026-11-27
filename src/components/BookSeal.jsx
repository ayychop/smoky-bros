import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useId } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'

const MotionLink = motion.create(Link)

// A round "book now" seal. The words circle slowly around a button, so it is the one small thing
// on the hero that does a job: it takes you straight to booking.
export default function BookSeal({ className }) {
  const id = `seal${useId().replace(/:/g, '')}`

  return (
    <MotionLink
      to="/book"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.06 }}
      aria-label="Bookings open for 2027, book the Bros"
      className={cn(
        'group relative grid place-items-center rounded-full border border-sun/70 bg-ink text-white shadow-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun',
        className,
      )}
    >
      <svg viewBox="0 0 120 120" aria-hidden="true" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <text fill="#FFFFFF" fontFamily="'Barlow Condensed', sans-serif" fontWeight="600" fontSize="10">
          <textPath href={`#${id}`} textLength="272" lengthAdjust="spacing">BOOKINGS OPEN FOR 2027 • BOOK THE BROS •</textPath>
        </text>
      </svg>
      <span className="relative grid h-[44%] w-[44%] place-items-center rounded-full bg-chili transition-colors duration-300 group-hover:bg-flame">
        <ArrowUpRight aria-hidden="true" className="h-1/2 w-1/2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
      </span>
    </MotionLink>
  )
}
