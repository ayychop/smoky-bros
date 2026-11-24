import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../easing'
import { PROCESS } from '../data/site'
import Reveal from './Reveal'

export default function ProcessSteps() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 md:pt-40">
      <Reveal className="mb-14">
        <p className="text-xs uppercase tracking-[0.4em] text-emberGlow">How it works</p>
        <h2 className="mt-5 font-serif text-4xl italic tracking-tight text-white/90 md:text-6xl">
          From enquiry to embers
        </h2>
      </Reveal>

      <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-4">
        {PROCESS.map((step, index) => (
          <motion.li
            key={step.index}
            className="grill-card relative rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: index * 0.12, ease: EASE_OUT_EXPO }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <span className="font-serif text-5xl italic text-ember/80">{step.index}</span>
            <h3 className="mt-6 font-serif text-2xl tracking-tight text-ash">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ash/60">{step.copy}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
