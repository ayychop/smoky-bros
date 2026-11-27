import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { FAQS } from '../data/site'
import { EASE_OUT_EXPO } from '../easing'
import Reveal from './Reveal'
import { ExitSign } from './RoadSign'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="paper relative">
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-20 md:pt-24">
      <Reveal className="mb-10 text-center">
        <ExitSign exit="05">
          Good to know
        </ExitSign>
        <h2 className="mt-4 font-display text-4xl text-ink md:text-6xl">Questions</h2>
      </Reveal>

      <Reveal y={24}>
        <ul className="space-y-3">
          {FAQS.map((item, index) => {
            const open = openIndex === index
            return (
              <li key={item.q} className={`rounded-xl border bg-white transition-all duration-300 ${open ? 'border-sun shadow-ember' : 'border-ink/10 hover:border-ink/30'}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-display text-lg text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun md:text-xl"
                  >
                    {item.q}
                    <motion.span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-sun"
                      animate={{ rotate: open ? 135 : 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    >
                      <Plus size={16} strokeWidth={2} />
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
                      <p className="max-w-xl px-5 pb-6 text-base leading-relaxed text-ink/70">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </Reveal>
      </div>
    </section>
  )
}
