import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BOOT_PLAYS, markBootSeen } from '../boot'
import { EASE_IN_OUT_EXPO, EASE_OUT_EXPO } from '../easing'
import Logo from './Logo'

// One ignition burst. Fixed angles, so it is identical on every load.
const BURST = Array.from({ length: 16 }, (_, index) => {
  const angle = (index / 16) * Math.PI * 2 - Math.PI / 2
  const reach = index % 2 === 0 ? 168 : 112
  return {
    x: Math.cos(angle) * reach,
    y: Math.sin(angle) * reach * 0.72,
    delay: (index % 4) * 0.045,
    size: index % 3 === 0 ? 4 : 2.5,
  }
})

const PANEL = { duration: 0.9, ease: EASE_IN_OUT_EXPO }

export default function BootLoader() {
  const [visible, setVisible] = useState(BOOT_PLAYS)

  useEffect(() => {
    if (!BOOT_PLAYS) return undefined
    markBootSeen()
    // The hero begins its entrance at 2.3s, so the panels start opening at the same moment
    const timer = window.setTimeout(() => setVisible(false), 2300)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 0.7 }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-[51%] bg-charcoal"
            exit={{ y: '-101%' }}
            transition={PANEL}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[51%] bg-charcoal"
            exit={{ y: '101%' }}
            transition={PANEL}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0, scale: 1.12 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          >
            {/* The strike: a coal that flares, then the mark arrives in it */}
            <motion.div
              className="absolute h-48 w-48 rounded-full bg-emberGlow blur-[70px]"
              initial={{ scale: 0.15, opacity: 0 }}
              animate={{ scale: [0.15, 1.35, 1], opacity: [0, 1, 0.75] }}
              transition={{ duration: 1.5, times: [0, 0.45, 1], ease: EASE_OUT_EXPO }}
            />
            <motion.div
              className="absolute h-[26rem] w-[26rem] rounded-full bg-ember blur-[110px] mix-blend-screen"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.55 }}
              transition={{ duration: 1.6, delay: 0.15, ease: EASE_OUT_EXPO }}
            />

            {BURST.map((spark, index) => (
              <motion.span
                key={index}
                className="absolute rounded-full bg-emberGlow shadow-[0_0_10px_3px_rgba(255,77,28,0.85)]"
                style={{ width: spark.size, height: spark.size }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{ x: spark.x, y: spark.y, opacity: [0, 1, 0], scale: [0.4, 1, 0.2] }}
                transition={{ duration: 1.15, delay: 0.35 + spark.delay, ease: EASE_OUT_EXPO }}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.15, delay: 0.28, ease: EASE_OUT_EXPO }}
            >
              <Logo alive className="relative h-44 w-44 sm:h-52 sm:w-52" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
