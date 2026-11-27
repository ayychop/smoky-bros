import { Link } from 'react-router-dom'
import FlameBro from './FlameBro'
import MagneticButton from './MagneticButton'
import Reveal from './Reveal'
import { ExitSign } from './RoadSign'
import Scallop from './Scallop'
import Smoke from './Smoke'

const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun'

export default function BookingCTA({ title = 'Your event, our fire' }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink px-6 pb-20 pt-24 text-center text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(200,54,10,0.4),transparent_70%),radial-gradient(40%_40%_at_50%_0%,rgba(200,54,10,0.25),transparent_70%)]" />
      <Smoke tone="dark" plumes={4} wisps={4} />
      <Scallop />
      <Reveal className="relative mx-auto max-w-3xl">
        <FlameBro alive className="mx-auto mb-6 h-36 w-auto" />
        <ExitSign exit="06" className="text-white">
          Bookings open for 2027
        </ExitSign>
        <h2 className="mt-5 font-display text-5xl leading-[1.02] text-white md:text-7xl">{title}</h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton>
            <Link
              to="/book"
              className={`inline-flex items-center justify-center rounded-full bg-chili px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-ember transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame ${ring}`}
            >
              Book your event
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              to="/enquiry"
              className={`inline-flex items-center justify-center rounded-full border border-white/30 px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink ${ring}`}
            >
              Ask a question
            </Link>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  )
}
