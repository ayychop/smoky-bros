import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { FAQS } from '../data/site'
import { EASE_OUT_EXPO } from '../easing'
import Reveal from './Reveal'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 md:pt-40">
      <Reveal className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-emberGlow">Good to know</p>
        <h2 className="mt-5 font-serif text-4xl italic tracking-tight text-white/90 md:text-6xl">Questions</h2>
      </Reveal>

      <Reveal y={24}>
        <ul className="border-t border-white/10">
          {FAQS.map((item, index) => {
            const open = openIndex === index
            return (
              <li key={item.q} className="border-b border-white/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-xl tracking-tight text-ash transition-colors duration-300 hover:text-emberGlow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow md:text-2xl"
                  >
                    {item.q}
                    <motion.span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15"
                      animate={{ rotate: open ? 135 : 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    >
                      <Plus size={16} strokeWidth={1.8} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 text-base leading-relaxed text-ash/60">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </section>
  )
}
