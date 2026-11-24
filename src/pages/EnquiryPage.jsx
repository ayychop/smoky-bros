import { ArrowUpRight, CalendarCheck, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import EnquiryForm from '../components/enquiry/EnquiryForm'
import MagneticButton from '../components/MagneticButton'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/site'

const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow'

export default function EnquiryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Enquiries"
        title="Let's talk fire"
        copy="Private catering, street food or a partnership. Send a message, or slide into our DMs."
      />

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          <Reveal y={24} amount={0.1}>
            <EnquiryForm />
          </Reveal>

          <Reveal y={24} delay={0.1} amount={0.1}>
            <aside className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl lg:sticky lg:top-32">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,77,28,0.28)_0%,transparent_70%)]"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <p className="relative text-xs uppercase tracking-[0.34em] text-emberGlow">Fastest way</p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative mt-4 flex items-center justify-between gap-4 rounded-2xl border border-ember/40 bg-ember/10 p-5 transition-all duration-500 hover:border-ember hover:shadow-[0_0_34px_rgba(200,54,10,0.4)] ${ring}`}
              >
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.26em] text-ash/50">DM us on Instagram</span>
                  <span className="mt-1 block font-serif text-2xl tracking-tight text-ash">{INSTAGRAM_HANDLE}</span>
                </span>
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="text-emberGlow transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <ul className="relative mt-6 space-y-5 border-t border-white/10 pt-6 text-sm text-ash/70">
                <li className="flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.6} aria-hidden="true" className="mt-0.5 shrink-0 text-emberGlow" />
                  Maidenhead, Berkshire, UK
                </li>
                <li className="flex items-start gap-3">
                  <CalendarCheck size={16} strokeWidth={1.6} aria-hidden="true" className="mt-0.5 shrink-0 text-emberGlow" />
                  Bookings open for 2027
                </li>
              </ul>

              <div className="relative mt-8 border-t border-white/10 pt-6">
                <p className="text-sm leading-relaxed text-ash/55">Already know the date and the guest count?</p>
                <div className="mt-4">
                  <MagneticButton>
                    <Link
                      to="/book"
                      className={`inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ash transition-colors duration-300 hover:border-ember hover:bg-ember/10 ${ring}`}
                    >
                      Book an event
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  )
}
