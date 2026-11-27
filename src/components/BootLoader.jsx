import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { BOOT_PLAYS, BOOT_WIPE_AT, BOOT_WIPE_FOR, finishBoot, useBootDone } from '../boot'
import { EASE_IN_OUT_EXPO, EASE_OUT_EXPO } from '../easing'
import BadgeSmoke from './BadgeSmoke'
import Logo from './Logo'
import Smoke from './Smoke'

// Embers thrown off where the badge lands. Fixed values, so every load looks the same.
const BURST = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2 + (i % 2) * 0.18
  const distance = 150 + (i % 4) * 40
  return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance * 0.8, size: 8 + (i % 3) * 4, color: i % 2 ? '#D92B0B' : '#FF6A13' }
})

// Once per session: a sunburst swells, the badge pops in piece by piece, the tagline arrives
// and a clip wipe lifts to reveal the site.
export default function BootLoader() {
  const done = useBootDone()

  useEffect(() => {
    if (!BOOT_PLAYS) return undefined

    const timer = window.setTimeout(finishBoot, BOOT_WIPE_AT * 1000)
    const skip = () => finishBoot()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    document.body.style.overflow = 'hidden'

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          role="status"
          aria-label="Loading Smoky Bros BBQ"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
          style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: BOOT_WIPE_FOR, ease: EASE_IN_OUT_EXPO }}
        >
          {/* Firelight swelling out from the centre, with smoke drifting up through it */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] will-change-transform"
            style={{ x: '-50%', y: '-50%', background: 'radial-gradient(closest-side, rgba(255,90,31,0.4), rgba(217,43,11,0.14) 45%, transparent 70%)' }}
            initial={{ scale: 0.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.2, delay: 0.1, ease: EASE_OUT_EXPO }}
          />
          <Smoke tone="dark" plumes={4} wisps={4} />

          <div className="relative flex flex-col items-center">
            {BURST.map((spark, index) => (
              <motion.span
                key={index}
                aria-hidden="true"
                className="absolute left-1/2 top-[40%] block rounded-full"
                style={{ width: spark.size, height: spark.size, background: spark.color }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{ x: spark.x, y: spark.y, opacity: [0, 1, 0], scale: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: EASE_OUT_EXPO }}
              />
            ))}

            {/* The same living badge as the hero: flickering flame, floating embers and curling smoke */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.3 }}
            >
              <div className="relative isolate h-60 w-60 sm:h-80 sm:w-80 md:h-[24rem] md:w-[24rem]">
                <BadgeSmoke />
                <Logo alive className="relative z-10 h-full w-full drop-shadow-[0_20px_50px_rgba(255,90,31,0.35)]" />
              </div>
            </motion.div>

            <motion.p
              className="font-cond mt-10 pl-[0.4em] text-center text-sm tracking-[0.4em] text-white/70 sm:text-base"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.9, ease: EASE_OUT_EXPO }}
            >
              LOW AND SLOW READY TO GO
            </motion.p>
          </div>

          <p className="absolute bottom-8 font-marker text-xs text-white/35">Tap to skip</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
