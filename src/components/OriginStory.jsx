import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { EASE_OUT_EXPO } from '../easing'
import { IMAGES } from '../data/site'

export default function OriginStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} className="relative px-6 pt-32 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
          initial={{ opacity: 0, x: -72 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        >
          <motion.img
            src={IMAGES.origin}
            alt="Cuts of meat cooking over glowing coals on a grill"
            loading="lazy"
            decoding="async"
            className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
            style={{ y: imageY }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 72 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.1, ease: EASE_OUT_EXPO }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-emberGlow">Our story</p>
          <h2 className="mt-6 font-serif text-5xl italic leading-[1.05] tracking-tight text-white/90 md:text-6xl">
            From the Pit to the Plate.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ash/65">
            We don&apos;t just cook. We craft. Deep in the heart of Maidenhead, we source, smoke, and grill to create an
            experience that demands to be remembered.
          </p>
          <Link
            to="/services"
            className="group mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-ash transition-colors duration-300 hover:text-emberGlow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
          >
            Explore our services
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
