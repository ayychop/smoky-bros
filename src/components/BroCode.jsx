import { motion } from 'framer-motion'
import Plate from './Plate'
import { BRO_CODE } from '../data/site'
import { EASE_OUT_EXPO } from '../easing'
import { ExitSign } from './RoadSign'
import Scallop from './Scallop'
import Smoke from './Smoke'

// House rules, said the way a good host would say them. Four cast iron plates that curve in around you.
const LEAN = [15, 5, -5, -15]

export default function BroCode() {
  return (
    <section aria-labelledby="smoky-code" className="relative isolate overflow-hidden bg-ink px-6 pb-16 pt-20 text-white md:pb-24 md:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(200,54,10,0.38),transparent_70%)]" />
      <Smoke tone="dark" plumes={3} wisps={3} />
      <Scallop />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        >
          <ExitSign exit="05" className="text-white">
            House rules
          </ExitSign>
          <h2 id="smoky-code" className="mt-4 font-display text-[2.15rem] leading-[1.02] text-white min-[380px]:text-[2.6rem] min-[400px]:text-5xl md:text-7xl">
            The Smoky Code
          </h2>
          <p className="font-lead mt-5 text-[1.4rem] leading-[1.4] text-white/85">Four simple rules we cook by, and every guest, young or old, is welcome to follow</p>
        </motion.div>

        {/* The stage: a deep perspective, so the four plates curve in around you */}
        <ol className="mt-16 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:[perspective:1500px]">
          {BRO_CODE.map((rule, index) => (
            <Plate
              key={rule.title}
              number={String(index + 1).padStart(2, '0')}
              label={`Rule ${rule.index.toLowerCase()}`}
              title={rule.title}
              copy={rule.copy}
              Icon={rule.Icon}
              lean={LEAN[index]}
              delay={index * 0.1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
