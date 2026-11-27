import { ArrowUpRight, CalendarCheck, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import EnquiryForm from '../components/enquiry/EnquiryForm'
import MagneticButton from '../components/MagneticButton'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/site'

const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink'

export default function EnquiryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Enquiries"
        hint="Prefer Instagram? DM us"
        title="Let's talk fire"
        copy="Private catering, street food or a partnership. Send a message, or slide into our DMs."
      />

      <div className="paper pb-20 pt-12">
        <section className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
            <Reveal y={24} amount={0.1}>
              <EnquiryForm />
            </Reveal>

            <Reveal y={24} delay={0.1} amount={0.1}>
              <aside className="relative overflow-hidden rounded-3xl border border-ink bg-teal p-7 text-cream shadow-sticker lg:sticky lg:top-32">
                <div aria-hidden="true" className="halftone-light pointer-events-none absolute inset-0 opacity-60" />
                <p className="relative inline-block  bg-sun px-3 py-1 font-marker text-lg text-ink">Fastest way</p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative mt-5 flex items-center justify-between gap-4 rounded-2xl border border-ink bg-cream p-5 text-ink shadow-sticker transition-all duration-200 hover:-translate-y-0.5 ${ring}`}
                >
                  <span>
                    <span className="block text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink/70">DM us on Instagram</span>
                    <span className="mt-1 block font-display text-2xl text-ink">{INSTAGRAM_HANDLE}</span>
                  </span>
                  <ArrowUpRight
                    size={24}
                    strokeWidth={2.4}
                    aria-hidden="true"
                    className="text-chili transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>

                <ul className="relative mt-6 space-y-4 text-base font-semibold">
                  <li className="flex items-start gap-3">
                    <MapPin size={18} strokeWidth={2.2} aria-hidden="true" className="mt-0.5 shrink-0 text-sun" />
                    Maidenhead, Berkshire, UK
                  </li>
                  <li className="flex items-start gap-3">
                    <CalendarCheck size={18} strokeWidth={2.2} aria-hidden="true" className="mt-0.5 shrink-0 text-sun" />
                    Bookings open for 2027
                  </li>
                </ul>

                <div className="relative mt-7 border-t border-dashed border-cream/40 pt-6">
                  <p className="text-sm font-medium leading-relaxed text-cream/85">Already know the date and the guest count?</p>
                  <div className="mt-4">
                    <MagneticButton>
                      <Link
                        to="/book"
                        className={`inline-flex items-center justify-center rounded-full border border-ink bg-chili px-6 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-cream shadow-sticker transition-all duration-200 hover:-translate-y-0.5 ${ring}`}
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
      </div>
    </>
  )
}
