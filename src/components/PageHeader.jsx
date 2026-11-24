import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../easing'

export default function PageHeader({ eyebrow, title, copy }) {
  return (
    <header className="relative overflow-hidden px-6 pb-16 pt-32 text-center md:pb-24 md:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[900px] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,54,10,0.28)_0%,transparent_65%)] [-webkit-mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
      />
      <motion.p
        className="relative text-xs uppercase tracking-[0.4em] text-emberGlow"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT_EXPO }}
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        className="relative mx-auto mt-6 max-w-4xl font-serif text-5xl italic tracking-tight text-white/90 md:text-7xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: EASE_OUT_EXPO }}
      >
        {title}
      </motion.h1>
      {copy && (
        <motion.p
          className="relative mx-auto mt-8 max-w-xl text-base leading-relaxed text-ash/65 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE_OUT_EXPO }}
        >
          {copy}
        </motion.p>
      )}
    </header>
  )
}
