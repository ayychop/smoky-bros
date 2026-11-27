import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SHOWCASE } from '../data/site'
import { EASE_OUT_EXPO } from '../easing'
import { cn } from '../lib/cn'
import Reveal from './Reveal'
import { ExitSign } from './RoadSign'
import Smoke from './Smoke'

const MotionLink = motion.create(Link)

// Three doorways into the business. Each is an arch of real fire photography, like the entrance to a
// restaurant, and the middle one sits lower so the row has a rhythm instead of reading as three boxes.
const ACTIONS = [
  {
    who: 'Private',
    label: 'Private Catering',
    note: 'Weddings, birthdays and garden parties, for every age',
    cta: 'Plan your day',
    to: '/services#private-catering',
    image: SHOWCASE[3].image,
    alt: SHOWCASE[3].alt,
    offset: '',
  },
  {
    who: 'Business',
    label: 'Corporate Events',
    note: 'Team days, launches and client dinners',
    cta: 'Book the Bros',
    to: '/book',
    image: SHOWCASE[0].image,
    alt: SHOWCASE[0].alt,
    offset: 'md:mt-16',
  },
  {
    who: 'Public',
    label: 'Street Food',
    note: 'The van, live fire, wherever you are',
    cta: 'Find the van',
    to: '/services#street-food',
    image: SHOWCASE[1].image,
    alt: SHOWCASE[1].alt,
    offset: '',
  },
]

// The arch leans a little toward the pointer, so it feels like it wants you to walk in
function Doorway({ who, label, note, cta, to, image }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const onMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.05)
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.05)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionLink
      to={to}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY }}
      className="group relative flex h-[28rem] cursor-pointer flex-col justify-end overflow-hidden rounded-b-2xl rounded-t-[999px] bg-ink text-center text-white shadow-sticker transition-shadow duration-500 hover:shadow-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun md:h-[32rem]"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.16] [filter:saturate(1.15)_contrast(1.06)_brightness(0.8)]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
      {/* Firelight rising off the bottom edge on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(255,90,31,0.55),transparent)] opacity-50 transition-opacity duration-700 group-hover:opacity-100"
      />
      {/* A thin inner arch, like the frame of a doorway */}
      <span aria-hidden="true" className="absolute inset-2 rounded-b-xl rounded-t-[999px] border border-white/25 transition-colors duration-500 group-hover:border-sun/80" />

      <span className="font-cond balance-track absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full border border-white/30 bg-ink/60 px-4 py-1.5 text-[0.7rem] tracking-[0.35em] text-sun backdrop-blur">
        {who}
      </span>

      <div className="relative px-8 pb-9">
        <h3 className="font-display text-3xl leading-tight">{label}</h3>
        <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-white/75">{note}</p>
        <span className="font-cond mt-6 inline-flex items-center gap-3 text-xs tracking-[0.3em] text-white">
          {cta}
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/40 transition-all duration-300 group-hover:border-sun group-hover:bg-sun group-hover:text-ink">
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </MotionLink>
  )
}

export default function QuickActions() {
  return (
    <section aria-label="Quick actions" className="paper relative isolate overflow-hidden px-6 pb-24 pt-20 text-ink md:pb-32 md:pt-24">
      <Smoke tone="light" plumes={2} />
      <Reveal className="relative mx-auto mb-12 max-w-3xl text-center md:mb-14">
        <ExitSign exit="01">Choose your stop</ExitSign>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] [text-wrap:balance] md:text-6xl">Three ways to enjoy your BBQ</h2>
      </Reveal>
      <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-7">
        {ACTIONS.map((action, index) => (
          <motion.div
            key={action.label}
            className={cn('mx-auto w-full max-w-sm md:max-w-none', action.offset)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: index * 0.12, ease: EASE_OUT_EXPO }}
          >
            <Doorway {...action} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
