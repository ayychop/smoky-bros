import { Star } from 'lucide-react'
import { TESTIMONIALS } from '../data/site'
import Ticker from './Ticker'

// A deep red band of five star reviews that never stops moving
export default function TestimonialMarquee() {
  return (
    <section aria-label="What people say" className="relative w-full overflow-hidden bg-chili py-5 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45),transparent_18%,transparent_82%,rgba(0,0,0,0.45))]" />
      <Ticker label="Reviews" duration={55} className="relative">
        {Array.from({ length: 3 }).flatMap((_, round) =>
          TESTIMONIALS.map((item) => (
            <span key={`${round}-${item.author}`} className="flex shrink-0 items-center whitespace-nowrap">
              <span className="flex items-center gap-1" aria-label="Five stars">
                {Array.from({ length: 5 }).map((__, star) => (
                  <Star key={star} size={18} aria-hidden="true" className="fill-white text-white" strokeWidth={1.5} />
                ))}
              </span>
              <span className="ml-5 font-display text-2xl text-white md:text-3xl">{item.quote}</span>
              <span className="font-cond balance-track ml-4 rounded-full border border-white/40 px-3 py-1 text-xs tracking-[0.22em] text-white">{item.author}</span>
              <span aria-hidden="true" className="mx-10 h-2 w-2 rotate-45 bg-white/70" />
            </span>
          )),
        )}
      </Ticker>
    </section>
  )
}
