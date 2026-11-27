import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../easing'
import FlameBro from './FlameBro'
import Smoke from './Smoke'

// A dark banner that opens every inner page: ember glow, drifting smoke and the flame bro looking on
export default function PageHeader({ eyebrow, title, copy, hint }) {
  return (
    <header className="ember-glow relative isolate overflow-hidden bg-ink px-6 pb-20 pt-32 text-center text-white md:pb-24 md:pt-36">
      <Smoke tone="dark" plumes={3} wisps={3} />
      <div className="pointer-events-none absolute -bottom-2 right-[5%] hidden items-end gap-3 lg:flex">
        {hint && (
          <p className="font-cond relative mb-16 max-w-[11rem] rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-left text-xs leading-snug tracking-[0.14em] text-white/85 backdrop-blur">
            {hint}
            <span aria-hidden="true" className="absolute -right-1.5 bottom-3 h-3 w-3 rotate-45 border-r border-t border-white/15 bg-[#1b100c]" />
          </p>
        )}
        <FlameBro alive className="h-44 w-auto" />
      </div>
      <motion.p
        className="font-cond relative inline-flex items-center gap-4 text-sm tracking-[0.4em] text-sun"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT_EXPO }}
      >
        <span aria-hidden="true" className="h-px w-8 bg-sun" />
        <span className="-mr-[0.4em]">{eyebrow}</span>
        <span aria-hidden="true" className="h-px w-8 bg-sun" />
      </motion.p>
      <motion.h1
        className="relative mx-auto mt-6 max-w-4xl font-display text-5xl leading-[1.04] text-white md:text-7xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: EASE_OUT_EXPO }}
      >
        {title}
      </motion.h1>
      {copy && (
        <motion.p
          className="font-lead relative mx-auto mt-6 max-w-xl text-[1.4rem] leading-[1.4] text-white/85 md:text-[1.7rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE_OUT_EXPO }}
        >
          {copy}
        </motion.p>
      )}
      <div aria-hidden="true" className="hairline-ember absolute inset-x-0 bottom-0 h-px" />
    </header>
  )
}
