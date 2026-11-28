import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBootDone } from '../boot'
import { SHOWCASE, SLOGAN } from '../data/site'
import { EASE_OUT_EXPO } from '../easing'
import { scrollToTarget } from '../lib/lenis'
import { ITEM_AT, ITEM_WIDTH, MASCOT_HEIGHT, MASCOT_LIFT } from '../lib/wheelGeometry'
import BookSeal from './BookSeal'
import FireWheel from './FireWheel'
import FlameBro from './FlameBro'
import MagneticButton from './MagneticButton'
import Polaroid from './Polaroid'
import Smoke from './Smoke'
import Spotlight from './Spotlight'
import Ticker from './Ticker'

const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }
const letter = { hidden: { y: '120%' }, show: { y: '0%', transition: { duration: 1, ease: EASE_OUT_EXPO } } }

// "Smoke" burns from orange at the first letter to red at the last
const FROM = [255, 138, 61]
const TO = [217, 43, 11]
const burn = (index, total) => {
  const t = total > 1 ? index / (total - 1) : 0
  return `rgb(${FROM.map((from, i) => Math.round(from + (TO[i] - from) * t)).join(',')})`
}

// The four things on the wheel. The wheel's geometry decides where each goes: centres on the rim, mirrored, all the same
// width, with each bead level with the middle of the inner edge. So the spacing is identical on every screen.
const SATELLITES = Object.entries(ITEM_AT).map(([key, { x, y }]) => ({ key, left: `${x.toFixed(2)}%`, top: `${y.toFixed(2)}%` }))

const TICKER = ['Smoked low and slow', 'Cooked over live fire', 'Catering and street food', 'We come to you', 'Fun for all ages', 'Made in Maidenhead']

export default function Hero() {
  const ready = useBootDone()
  const ref = useRef(null)

  // Parallax: the mascot, each photo and the headline travel at their own speed
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // The scroll cue is for the very top of the page only: it melts away as soon as they start scrolling
  const { scrollY } = useScroll()
  const cueOpacity = useTransform(scrollY, [0, 120], [1, 0])
  const cuePointer = useTransform(scrollY, (y) => (y > 100 ? 'none' : 'auto'))
  const cueRef = useRef(null)
  // Once the cue has faded away its loops stop too
  useMotionValueEvent(scrollY, 'change', (y) => {
    if (cueRef.current) cueRef.current.dataset.paused = y > 120 ? 'true' : 'false'
  })
  const nudge = () => ref.current?.nextElementSibling && scrollToTarget(ref.current.nextElementSibling)
  const broY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const broScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const broOpacity = useTransform(scrollYProgress, [0.2, 0.9], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.7], [1, 0])

  // The mascot leans a little toward the pointer
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 90, damping: 20, mass: 0.5 })
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 90, damping: 20, mass: 0.5 })

  useEffect(() => {
    const onMove = (event) => {
      px.set(event.clientX / window.innerWidth - 0.5)
      py.set(event.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [px, py])

  const state = ready ? 'show' : 'hidden'
  const enter = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
  })

  const accentLetters = Array.from(SLOGAN.accent)

  return (
    <section ref={ref} className="ember-glow relative isolate overflow-hidden bg-ink text-white">
      <Smoke tone="dark" plumes={4} embers={12} />


      <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 pb-14 pt-24 lg:min-h-[calc(100svh-3.9rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-24 lg:pt-32">
        {/* Words */}
        <motion.div className="relative z-10 text-center will-change-transform lg:text-left" style={{ y: textY, opacity: textOpacity }}>
          <motion.p {...enter(0.1)} className="font-cond inline-flex items-center gap-4 text-sm tracking-[0.4em] text-sun md:text-base">
            <span aria-hidden="true" className="h-px w-10 bg-sun" />
            <span>
              Fire on, <span className="text-white">hunger off</span>
            </span>
          </motion.p>

          <motion.h1
            aria-label={`${SLOGAN.lead} ${SLOGAN.accent}`}
            className="mt-5 flex justify-center font-display leading-[1] lg:mt-6 lg:justify-start"
            variants={container}
            initial="hidden"
            animate={state}
          >
            <span aria-hidden="true" className="-mx-2 inline-flex overflow-hidden whitespace-nowrap px-2 pb-4 pr-4 text-[2.7rem] min-[420px]:text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem]">
              {Array.from(SLOGAN.lead).map((char, index) => (
                <motion.span key={index} variants={letter} className="inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
              {accentLetters.map((char, index) => (
                <motion.span key={`a${index}`} variants={letter} className="inline-block" style={{ color: burn(index, accentLetters.length) }}>
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p {...enter(1.0)} className="font-lead mx-auto mt-6 max-w-lg text-[1.4rem] leading-[1.4] text-white/85 lg:mx-0 md:text-[1.7rem]">
            Premium BBQ catering and street food for your event, cooked over real fire and brought to you from Maidenhead, Berkshire
          </motion.p>

          <motion.div {...enter(1.15)} className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <MagneticButton>
              <Link
                to="/#menu"
                className={`inline-flex items-center justify-center rounded-full bg-chili px-9 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-ember transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame ${ring}`}
              >
                View the Menu
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/book"
                className={`inline-flex items-center justify-center rounded-full border border-white/30 px-9 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink ${ring}`}
              >
                Book the Bros
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* The stage: a square, so the wheel is a true circle, with the flame bro at its centre and four things on its rim */}
        <div className="relative order-first mx-auto aspect-square w-full max-w-[22rem] sm:max-w-md lg:order-none md:max-w-[34rem]">
          <FireWheel />

          <motion.div className="absolute inset-0 z-20 flex items-center justify-center" style={{ y: broY, scale: broScale, opacity: broOpacity }}>
            <motion.div
              className="relative"
              style={{ height: `${MASCOT_HEIGHT}%`, top: `-${MASCOT_LIFT}%`, rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.3 }}
            >
              <FlameBro alive className="h-full w-auto" />
            </motion.div>
          </motion.div>

          {SATELLITES.map((item, index) => (
            <div key={item.key} className="absolute z-30 -translate-x-1/2 -translate-y-1/2" style={{ left: item.left, top: item.top, width: `${ITEM_WIDTH}%` }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.7 + index * 0.15 }}
              >
                {item.key === 'brisket' && (
                  <Link to="/#menu" aria-label="See the menu, brisket" className={`block w-full ${ring}`}>
                    <Polaroid src={SHOWCASE[0].image} alt={SHOWCASE[0].alt} caption="Brisket" priority imgClassName="aspect-[4/3]" className="!pb-8 transition-transform duration-300 hover:-translate-y-1" />
                  </Link>
                )}
                {item.key === 'wings' && (
                  <Link to="/#menu" aria-label="See the menu, wings" className={`block w-full ${ring}`}>
                    <Polaroid src={SHOWCASE[1].image} alt={SHOWCASE[1].alt} caption="Wings" priority imgClassName="aspect-[4/3]" className="!pb-8 transition-transform duration-300 hover:-translate-y-1" />
                  </Link>
                )}
                {item.key === 'seal' && <BookSeal className="aspect-square w-full" />}
                {item.key === 'ribs' && (
                  <Link to="/#menu" aria-label="See the menu, ribs" className={`block w-full ${ring}`}>
                    <Polaroid src={SHOWCASE[3].image} alt={SHOWCASE[3].alt} caption="Ribs" priority imgClassName="aspect-[4/3]" className="!pb-8 transition-transform duration-300 hover:-translate-y-1" />
                  </Link>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue. Small screens: a round arrow tucked in the corner, clear of the buttons. Big, tall screens: a
          line under the buttons, lined up with the headline. Either way it melts away as soon as they start scrolling. */}
      <motion.div
        ref={cueRef}
        className="pointer-events-none fixed bottom-5 right-4 z-30 [@media(min-width:1024px)_and_(min-height:800px)]:inset-x-0 [@media(min-width:1024px)_and_(min-height:800px)]:right-0 [@media(min-width:1024px)_and_(min-height:800px)]:bottom-[4.75rem] [@media(min-width:1024px)_and_(min-height:800px)]:mx-auto [@media(min-width:1024px)_and_(min-height:800px)]:flex [@media(min-width:1024px)_and_(min-height:800px)]:max-w-7xl [@media(min-width:1024px)_and_(min-height:800px)]:justify-start [@media(min-width:1024px)_and_(min-height:800px)]:px-6"
        style={{ opacity: cueOpacity }}
      >
        <motion.button
          type="button"
          onClick={nudge}
          style={{ pointerEvents: cuePointer }}
          aria-label="Scroll down to explore"
          className={`group flex flex-col items-center gap-2 rounded-full [@media(min-width:1024px)_and_(min-height:800px)]:items-start [@media(min-width:1024px)_and_(min-height:800px)]:py-1 ${ring}`}
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, delay: 2.2, ease: EASE_OUT_EXPO }}
        >
          {/* Phones */}
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-ink/80 shadow-[0_0_28px_-4px_rgba(255,183,3,0.45)] backdrop-blur [@media(min-width:1024px)_and_(min-height:800px)]:hidden">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="cue-bob h-5 w-5 fill-none stroke-gold" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v13M6 13l6 6 6-6" />
            </svg>
          </span>
          {/* Tablet and desktop */}
          <span className="font-cond hidden text-[0.7rem] uppercase tracking-[0.45em] text-white/70 transition-colors duration-300 group-hover:text-gold [@media(min-width:1024px)_and_(min-height:800px)]:block">
            Scroll to explore
          </span>
          <span aria-hidden="true" className="relative hidden h-9 w-px overflow-hidden bg-white/20 [@media(min-width:1024px)_and_(min-height:800px)]:block">
            <span className="cue-sweep absolute inset-x-0 top-0 block h-5 bg-gradient-to-b from-transparent via-gold to-transparent" />
          </span>
        </motion.button>
      </motion.div>

      <Spotlight />

      {/* A thin strip along the bottom, so the page never stops on empty space */}
      <div className="relative z-10 border-y border-white/10 bg-black/75 py-4">
        <Ticker label="Smoky Bros BBQ" duration={50}>
          {TICKER.map((text) => (
            <span key={text} className="font-cond flex shrink-0 items-center whitespace-nowrap text-base tracking-[0.3em] text-white/75 md:text-xl">
              {text}
              <span aria-hidden="true" className="mx-8 h-1.5 w-1.5 rotate-45 bg-sun md:mx-10" />
            </span>
          ))}
        </Ticker>
      </div>
    </section>
  )
}
