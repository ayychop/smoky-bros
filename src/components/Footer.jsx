import { Link } from 'react-router-dom'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/site'
import Logo from './Logo'
import Smoke from './Smoke'
import MagneticButton from './MagneticButton'
import { RoadLine } from './RoadSign'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ember-glow relative isolate z-10 overflow-hidden bg-ink text-center text-white">
      <Smoke tone="dark" plumes={4} wisps={4} />
      <RoadLine />
      <div className="px-6 pb-12 pt-12">
      <div className="relative z-10">
        <Logo className="mx-auto mb-6 h-28 w-28" />
        <p className="font-marker balance-track text-base text-sun">Based in Maidenhead, Berkshire, UK</p>
        <p className="mt-2 text-sm text-white/60">DM for private catering enquiries and partnerships</p>
        <nav aria-label="Footer" className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { label: 'Services', to: '/services' },
            { label: 'Menu', to: '/#menu' },
            { label: 'Book an event', to: '/book' },
            { label: 'Enquiries', to: '/enquiry' },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="relative before:absolute before:-inset-x-3 before:-inset-y-3 before:content-[''] text-xs font-semibold uppercase tracking-[0.24em] text-white/80 transition-colors duration-300 hover:text-sun focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun"
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
              aria-label="Smoky Bros BBQ on Instagram"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-sun hover:bg-chili focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun"
            >
              <InstagramIcon />
              {INSTAGRAM_HANDLE}
            </a>
          </MagneticButton>
        </div>
        <p className="mt-10 text-sm text-white/40">© {year} Smoky Bros BBQ. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
