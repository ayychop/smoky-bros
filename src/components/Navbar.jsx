import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useBootDone } from '../boot'
import { EASE_OUT_EXPO } from '../easing'
import Logo from './Logo'
import Smoke from './Smoke'
import MagneticButton from './MagneticButton'

const LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Menu', to: '/#menu' },
  { label: 'Enquiries', to: '/enquiry' },
]

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun'
const linkBase = `relative py-1 before:absolute before:-inset-x-3 before:-inset-y-3 before:content-[''] text-xs font-semibold uppercase tracking-[0.24em] text-white/80 transition-colors duration-200 hover:text-sun ${focusRing}`

function DesktopLink({ link }) {
  // The menu is an anchor on the home page, so it never gets a route-level active state
  if (link.to.includes('#')) {
    return (
      <Link to={link.to} className={linkBase}>
        {link.label}
      </Link>
    )
  }

  return (
    <NavLink to={link.to} className={linkBase}>
      {({ isActive }) => (
        <>
          {link.label}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-0 -bottom-1 h-px bg-sun"
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
  const ready = useBootDone()

  // Slides away while reading down the page, comes back the moment you scroll up
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    const next = latest > previous && latest > 140
    if (next !== hidden) setHidden(next)
  })

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
        className="fixed left-1/2 top-4 z-50 flex w-[92%] max-w-5xl items-center justify-between rounded-full border border-white/15 bg-ink/75 py-1.5 pl-3 pr-2.5 shadow-sticker backdrop-blur-xl sm:pl-4 sm:pr-3"
        initial={{ opacity: 0, x: '-50%', y: -24 }}
        animate={{ opacity: ready ? 1 : 0, x: '-50%', y: !ready ? -24 : hidden && !open ? -130 : 0 }}
        transition={{ duration: 0.7, delay: ready && !hidden ? 0.2 : 0, ease: EASE_OUT_EXPO }}
      >
        <Link to="/" aria-label="Smoky Bros BBQ, home" className={`group flex shrink-0 items-center gap-1.5 sm:gap-2 ${focusRing}`}>
          {/* The badge with a slow gleam that crosses it every few seconds, like light catching polished metal */}
          <span className="relative -my-2 block h-12 w-12 shrink-0 min-[400px]:h-14 min-[400px]:w-14 transition-transform duration-300 group-hover:scale-105 sm:-my-3 sm:h-16 sm:w-16">
            <Logo className="h-full w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-[3.5%] overflow-hidden rounded-full">
              <span className="nav-gleam absolute inset-y-0 -left-1/2 w-1/2" />
            </span>
            <span aria-hidden="true" className="nav-gleam-ring pointer-events-none absolute inset-[2%] rounded-full" />
          </span>
          <span className="whitespace-nowrap font-display text-[0.72rem] tracking-[0.06em] text-white min-[400px]:text-sm min-[400px]:tracking-[0.1em] sm:text-base sm:tracking-[0.12em] md:text-sm lg:text-lg">SMOKY BROS BBQ</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-9">
          {LINKS.map((link) => (
            <DesktopLink key={link.label} link={link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton>
            <Link
              to="/book"
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-full bg-chili px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame sm:px-6 sm:text-xs ${focusRing}`}
            >
              Book Event
            </Link>
          </MagneticButton>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white md:hidden ${focusRing}`}
          >
            {open ? <X size={18} aria-hidden="true" strokeWidth={3} /> : <Menu size={18} aria-hidden="true" strokeWidth={3} />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            className="ember-glow fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-8 pb-10 pt-28 md:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <Smoke tone="dark" plumes={3} wisps={3} className="!-z-0" />
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
                    className={`block py-1.5 font-display text-5xl text-white transition-colors hover:text-sun ${focusRing}`}
                    style={{ WebkitTextStroke: '0px' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="relative mt-8 inline-block self-start font-marker text-sm text-sun">
              Maidenhead, Berkshire, bookings open for 2027
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
