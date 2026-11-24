import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BOOT_PLAYS } from '../boot'
import { EASE_OUT_EXPO } from '../easing'
import { IMAGES, SLOGAN } from '../data/site'
import Logo from './Logo'
import MagneticButton from './MagneticButton'
import Smoke from './Smoke'

// Deterministic, so every render and every reload places the sparks identically
function unit(index, salt) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return value - Math.floor(value)
}

const SPARKS = Array.from({ length: 16 }, (_, index) => ({
  left: `${Math.round(unit(index, 1) * 100)}%`,
  bottom: `${Math.round(unit(index, 4) * 24)}%`,
  delay: `-${(unit(index, 2) * 12).toFixed(2)}s`,
  duration: `${(7 + unit(index, 3) * 9).toFixed(2)}s`,
}))

const START = BOOT_PLAYS ? 2.3 : 0.15

export default function Hero() {
  // The badge leans toward the cursor, so it feels like it is paying attention
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const spring = { stiffness: 90, damping: 16, mass: 0.6 }
  const tiltY = useSpring(useTransform(pointerX, [-1, 1], [-10, 10]), spring)
  const tiltX = useSpring(useTransform(pointerY, [-1, 1], [8, -8]), spring)

  useEffect(() => {
    const onMove = (event) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointerX, pointerY])

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-charcoal">
      <img
        src={IMAGES.hero}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/70 via-transparent to-charcoal" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#050505_100%)]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {SPARKS.map((spark, index) => (
          <span
            key={index}
            className="ember-float absolute h-1.5 w-1.5 rounded-full bg-emberGlow blur-[1px] shadow-[0_0_10px_3px_rgba(255,77,28,0.7)]"
            style={{
              left: spark.left,
              bottom: spark.bottom,
              animationDelay: spark.delay,
              animationDuration: spark.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 pb-28 pt-32 text-center md:pt-28">
        <div className="relative flex items-center justify-center">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <Smoke strength={0.8} className="absolute left-1/2 top-1/2 h-[820px] w-[1500px] max-w-[260vw] -translate-x-1/2 -translate-y-[56%]" />
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.15, delay: START, ease: EASE_OUT_EXPO }}
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 5, delay: START + 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}>
                <div className="relative z-10 flex w-64 items-center justify-center rounded-full bg-black/40 p-4 backdrop-blur-md md:w-80">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-ember blur-[100px] rounded-full opacity-40 mix-blend-screen pointer-events-none animate-pulse" />
                  <Logo alive className="aspect-square h-auto w-full" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.h1
          className="mt-8 font-serif text-5xl italic text-white/90 md:text-7xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: START + 0.15, ease: EASE_OUT_EXPO }}
        >
          {SLOGAN.lead}{' '}
          <span className="bg-gradient-to-r from-[#ffd9bf] via-emberGlow to-ember bg-clip-text pr-2 text-transparent">
            {SLOGAN.accent}
          </span>
        </motion.h1>

        <motion.p
          className="mb-8 mt-4 font-sans text-xs uppercase tracking-[0.4em] text-gray-400"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: START + 0.3, ease: EASE_OUT_EXPO }}
        >
          Premium BBQ catering. Maidenhead, Berkshire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: START + 0.45, ease: EASE_OUT_EXPO }}
        >
          <MagneticButton>
            <Link
              to="/#menu"
              className="inline-flex items-center justify-center rounded-full bg-ember px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(200,54,10,0.35)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,77,28,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
            >
              View the Menu
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Sits above the glow so the hero melts into the page instead of ending on a hard edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-charcoal to-transparent" />
    </section>
  )
}
