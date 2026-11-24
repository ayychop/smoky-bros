import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../easing'
import { SHOWCASE } from '../data/site'
import Smoke from './Smoke'

// Sparks drifting up each photo. Fixed numbers, so every render and reload is identical.
// x: where it starts (%), sx: sideways drift, dur and delay in seconds (delay is negative so they are mid-flight on load)
const SPARKS = [
  { x: 14, sx: '10px', dur: 5.2, delay: 0.5 },
  { x: 33, sx: '-14px', dur: 6.4, delay: 2.8 },
  { x: 51, sx: '8px', dur: 4.8, delay: 1.6 },
  { x: 70, sx: '16px', dur: 6, delay: 4.1 },
  { x: 88, sx: '-8px', dur: 5.5, delay: 3.3 },
]

export default function PremiumMenu() {
  return (
    <section id="menu" className="relative px-6 pb-8 pt-32 md:pt-40">
      <motion.h2
        className="mb-16 text-center font-serif text-5xl text-white/90"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      >
        The Menu
      </motion.h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:auto-rows-[18rem] md:grid-cols-3 lg:auto-rows-[22rem]">
        {SHOWCASE.map((card, index) => (
          <motion.article
            key={card.title}
            className={`group relative aspect-video overflow-hidden rounded-3xl border border-white/10 transition-[border-color,box-shadow] duration-500 hover:border-ember/60 hover:shadow-[0_0_50px_rgba(255,77,28,0.35)] md:aspect-auto ${card.span}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, delay: (index % 2) * 0.1, ease: EASE_OUT_EXPO }}
          >
            {/* Fire grade: richer reds and oranges, deeper blacks */}
            <img
              src={card.image}
              alt={card.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 [filter:saturate(1.25)_contrast(1.08)_brightness(0.92)] group-hover:scale-105"
            />

            {/* Heat rising from the bottom edge, breathing */}
            <div
              aria-hidden="true"
              className="fire-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(255,77,28,0.55),transparent_62%)] mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Smoke drifting across the photo */}
            <Smoke count={3} scale={0.6} strength={0.55} className="absolute inset-0" />

            {/* Sparks */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              {SPARKS.map((spark) => (
                <span
                  key={spark.x}
                  className="ember-rise absolute bottom-3 h-1 w-1 rounded-full bg-emberGlow shadow-[0_0_8px_2px_rgba(255,77,28,0.8)]"
                  style={{
                    left: `${spark.x}%`,
                    animationDuration: `${spark.dur}s`,
                    animationDelay: `-${spark.delay}s`,
                    '--sx': spark.sx,
                  }}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-serif text-3xl text-white">{card.title}</h3>
              <p className="mt-1 text-sm text-white/70">{card.note}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
