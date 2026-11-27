import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { IMAGES, SHOWCASE } from '../data/site'
import { EASE_OUT_EXPO } from '../easing'
import Polaroid from './Polaroid'
import { ExitSign } from './RoadSign'
import Burst from './Burst'
import Smoke from './Smoke'

const LINES = ['Two brothers,', 'one family fire']

// A headline line that rises out of its own mask
function MaskedLine({ children, delay, show }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: '110%' }}
        animate={show ? { y: '0%' } : undefined}
        transition={{ duration: 1.1, delay, ease: EASE_OUT_EXPO }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function OriginStory() {
  const ref = useRef(null)
  // Masked elements cannot report their own visibility, so the unclipped section triggers them
  const show = useInView(ref, { once: true, amount: 0.3 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bigY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const smallY = useTransform(scrollYProgress, [0, 1], [-20, 50])

  return (
    <section ref={ref} className="paper relative isolate overflow-hidden px-6 pb-20 pt-24 text-ink md:pb-28 md:pt-28">
      <Smoke tone="light" plumes={3} wisps={3} />
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-10">
        {/* Photo wall */}
        <motion.div
          className="relative mx-auto h-[28rem] w-full max-w-md will-change-transform md:h-[35rem]"
          initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
          animate={show ? { clipPath: 'inset(-10% -10% -10% -10%)' } : undefined}
          transition={{ duration: 1.3, ease: EASE_OUT_EXPO }}
        >
          <motion.div className="absolute left-0 top-0 w-[70%]" style={{ y: bigY }}>
            <Polaroid src={IMAGES.origin} alt="Cuts of meat cooking over a grill with glowing coals" caption="Straight off the pit" className="" />
          </motion.div>
          <motion.div className="absolute bottom-0 right-0 w-[46%]" style={{ y: smallY }}>
            <Polaroid src={SHOWCASE[2].image} alt={SHOWCASE[2].alt} caption="Sides on fire" className="" />
          </motion.div>
          <Burst className="absolute right-2 top-4 h-24 w-24 md:right-0 md:h-28 md:w-28">
            Maidenhead
            <br />
            Berkshire
          </Burst>
        </motion.div>

        {/* Words */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={show ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE_OUT_EXPO }}
        >
          <ExitSign exit="04">
            Our story
          </ExitSign>
          <h2 className="mt-5 font-display text-5xl leading-[1.02] text-ink md:text-5xl lg:text-6xl xl:text-7xl">
            {LINES.map((line, index) => (
              <MaskedLine key={line} show={show} delay={0.15 + index * 0.12}>
                {index === 1 ? <span className="text-chili">{line}</span> : line}
              </MaskedLine>
            ))}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-0.5 w-16 bg-sun" />
          <motion.p
            className="font-lead mt-6 max-w-lg text-[1.4rem] leading-[1.4] text-ink/80"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, y: 24 }}
            animate={show ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE_OUT_EXPO }}
          >
            We grew up around the fire, watching our parents, true BBQ veterans, keep a table full of friends and family. Smoky Bros BBQ
            is that heritage, brought on the road to yours.
          </motion.p>
          <motion.div whileTap={{ scale: 0.95 }} className="mt-8 inline-block">
            <Link
              to="/services"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-chili focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
            >
              Explore our services
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
