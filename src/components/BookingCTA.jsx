import { Link } from 'react-router-dom'
import MagneticButton from './MagneticButton'
import Reveal from './Reveal'

const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow'

export default function BookingCTA({ title = 'Your event. Our fire.' }) {
  return (
    <section className="relative overflow-hidden px-6 pt-32 md:pt-40">
      <div className="grill-card relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-20 text-center backdrop-blur-md md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,77,28,0.4)_0%,rgba(200,54,10,0.12)_40%,transparent_70%)]"
        />
        <Reveal className="relative">
          <p className="text-xs uppercase tracking-[0.4em] text-emberGlow">Bookings open for 2027</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl italic leading-[1.05] tracking-tight text-white/90 md:text-6xl">
            {title}
          </h2>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton>
              <Link
                to="/book"
                className={`inline-flex items-center justify-center rounded-full bg-ember px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(200,54,10,0.6)] ${ring}`}
              >
                Book your event
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/enquiry"
                className={`inline-flex items-center justify-center rounded-full border border-white/20 px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ash transition-colors duration-300 hover:border-ember hover:bg-ember/10 ${ring}`}
              >
                Ask a question
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
