import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BOOT_PLAYS } from '../boot'
import { EASE_OUT_EXPO } from '../easing'
import MagneticButton from './MagneticButton'

const LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Menu', to: '/#menu' },
  { label: 'Enquiries', to: '/enquiry' },
]

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow'

function DesktopLink({ link }) {
  const className = ({ isActive }) =>
    `relative py-1 text-xs uppercase tracking-[0.24em] transition-colors duration-300 ${focusRing} ${
      isActive ? 'text-ash' : 'text-ash/55 hover:text-ash'
    }`

  // The menu is an anchor on the home page, so it never gets a route-level active state
  if (link.to.includes('#')) {
    return (
      <Link to={link.to} className={`py-1 text-xs uppercase tracking-[0.24em] text-ash/55 transition-colors duration-300 hover:text-ash ${focusRing}`}>
        {link.label}
      </Link>
    )
  }

  return (
    <NavLink to={link.to} className={className}>
      {({ isActive }) => (
        <>
          {link.label}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-0 -bottom-1 h-px bg-emberGlow"
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  // The sheet is open only for the route it was opened on, so navigating closes it for free
  const { pathname } = useLocation()
  const [openPath, setOpenPath] = useState(null)
  const open = openPath === pathname
  const setOpen = (next) => setOpenPath(next ? pathname : null)

  // Lock page scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Framer owns the transform, so the horizontal centring lives in x rather than a translate class */}
      <motion.header
        className="fixed left-1/2 top-6 z-50 flex w-[90%] max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-xl sm:px-8"
        initial={{ opacity: 0, x: '-50%', y: -12 }}
        animate={{ opacity: 1, x: '-50%', y: 0 }}
        transition={{ duration: 0.8, delay: BOOT_PLAYS ? 2.3 : 0.2, ease: EASE_OUT_EXPO }}
      >
        <Link to="/" className={`font-sans text-sm font-bold tracking-[0.22em] text-ash sm:text-base ${focusRing}`}>
          SMOKY BROS
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <DesktopLink key={link.label} link={link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton>
            <Link
              to="/book"
              className={`inline-flex items-center justify-center rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(255,77,28,0.35)] transition-shadow duration-300 hover:shadow-[0_0_26px_rgba(255,77,28,0.6)] sm:px-6 sm:text-sm ${focusRing}`}
            >
              Book Event
            </Link>
          </MagneticButton>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ash md:hidden ${focusRing}`}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-charcoal/95 px-8 pb-10 pt-28 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            <nav aria-label="Mobile" className="relative my-auto flex flex-col gap-1">
              {[{ label: 'Home', to: '/' }, ...LINKS, { label: 'Book Event', to: '/book' }].map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + index * 0.07, ease: EASE_OUT_EXPO }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block py-1.5 font-serif text-4xl italic tracking-tight text-ash/90 sm:text-5xl ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="relative mt-8 text-xs uppercase tracking-[0.3em] text-ash/40">
              Maidenhead, Berkshire. Bookings open for 2027.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
