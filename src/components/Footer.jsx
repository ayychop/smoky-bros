import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/site'
import { EASE_OUT_EXPO } from '../easing'
import Logo from './Logo'
import MagneticButton from './MagneticButton'
import Smoke from './Smoke'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-32 bg-charcoal px-6 py-24 text-center">
      <Smoke strength={0.7} className="absolute inset-x-0 top-0 -z-10 h-[560px]" />
      <Logo alive className="mx-auto mb-10 h-36 w-36 sm:h-44 sm:w-44" />
      <motion.h2
        className="relative inline-block font-serif text-[18vw] leading-[0.85] tracking-tighter md:text-[8.5rem]"
        initial="rest"
        whileHover="hot"
      >
        <span className="block text-transparent" style={{ WebkitTextStroke: '1.5px rgba(229, 229, 229, 0.92)' }}>
          LET'S COOK
        </span>
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 block text-ember"
          variants={{
            rest: { opacity: 0 },
            hot: { opacity: 1 },
          }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          LET'S COOK
        </motion.span>
      </motion.h2>
      <p className="mt-8 text-ash/65">Maidenhead, Berkshire, UK</p>
      <p className="mt-2 text-sm text-ash/45">DM for private catering enquiries and partnerships.</p>
      <nav aria-label="Footer" className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {[
          { label: 'Services', to: '/services' },
          { label: 'Menu', to: '/#menu' },
          { label: 'Book an event', to: '/book' },
          { label: 'Enquiries', to: '/enquiry' },
        ].map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="text-xs uppercase tracking-[0.26em] text-ash/55 transition-colors duration-300 hover:text-emberGlow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-8 flex justify-center">
        <MagneticButton>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Smoky Bros on Instagram"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.22em] text-ash focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
          >
            <InstagramIcon />
            {INSTAGRAM_HANDLE}
          </a>
        </MagneticButton>
      </div>
      <p className="mt-12 text-sm text-ash/40">© {year} Smoky Bros. All rights reserved.</p>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
