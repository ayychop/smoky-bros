import { motion } from 'framer-motion'
import { TESTIMONIALS } from '../data/site'

// One half of the loop. Two identical halves make a -50% shift seamless,
// and each half is wider than any screen so the row never shows a gap.
function Half({ hidden = false }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {Array.from({ length: 4 }).flatMap((_, round) =>
        TESTIMONIALS.map((item) => (
          <span key={`${round}-${item.author}`} className="flex shrink-0 items-center whitespace-nowrap">
            <span>
              {item.quote} - {item.author}
            </span>
            <span aria-hidden="true" className="mx-8 text-white/30">
              &bull;
            </span>
          </span>
        )),
      )}
    </div>
  )
}

export default function TestimonialMarquee() {
  return (
    <section aria-label="What people say" className="mt-32 w-full overflow-hidden border-y border-white/10 bg-black/50 py-6 font-serif text-lg italic text-ember md:mt-40">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
      >
        <Half />
        <Half hidden />
      </motion.div>
    </section>
  )
}
