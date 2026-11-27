import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../easing'
import DryIce from './DryIce'
import BadgeSmoke from './BadgeSmoke'
import Logo from './Logo'
import { MileMarker } from './RoadSign'
import Smoke from './Smoke'

// The second page. Right after the hero it gives the brand one full screen to itself: the badge,
// the call to cook, and a road sign pointing the visitor on to everything below.
export default function CookStage() {
  return (
    <section aria-label="Let's cook" className="ember-glow relative isolate flex flex-col items-center justify-center overflow-hidden bg-ink px-6 pb-20 pt-32 text-center text-white">
      <Smoke tone="dark" plumes={4} embers={10} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
        <DryIce intensity={0.2} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
      >
        <div className="relative isolate mx-auto h-52 w-52 sm:h-64 sm:w-64">
          <BadgeSmoke />
          <Logo alive className="relative z-10 h-full w-full" />
        </div>
      </motion.div>

      <motion.h2
        className="relative mt-8 inline-block font-display text-[16vw] leading-[0.9] md:text-[8.5rem]"
        initial="rest"
        whileHover="hot"
      >
        <span className="block text-transparent" style={{ WebkitTextStroke: '2px #FFB703' }}>
          LET&apos;S COOK
        </span>
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 block text-sun"
          variants={{ rest: { opacity: 0 }, hot: { opacity: 1 } }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          LET&apos;S COOK
        </motion.span>
      </motion.h2>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT_EXPO }}
      >
        <MileMarker to="/book" place="Your event" note="Book the Bros" />
      </motion.div>
      <p className="font-marker balance-track mt-6 text-base text-sun">Based in Maidenhead, Berkshire, UK</p>
    </section>
  )
}
