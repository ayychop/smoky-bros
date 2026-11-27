import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SHOWCASE } from '../data/site'
import { EASE_OUT_EXPO } from '../easing'
import { cn } from '../lib/cn'
import { ExitSign } from './RoadSign'
import SauceBottle from './SauceBottle'
import Scallop from './Scallop'
import FlameBro from './FlameBro'
import Smoke from './Smoke'

const MotionLink = motion.create(Link)

// A card that tilts in 3D toward the pointer, with a warm light that follows it
function TiltCard({ className, children, as: Tag = motion.div, ...rest }) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 140, damping: 18, mass: 0.5 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 140, damping: 18, mass: 0.5 })
  const lightX = useTransform(px, [0, 1], ['0%', '100%'])
  const lightY = useTransform(py, [0, 1], ['0%', '100%'])
  const light = useMotionTemplate`radial-gradient(420px circle at ${lightX} ${lightY}, rgba(255,183,3,0.22), transparent 60%)`

  const onMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - bounds.left) / bounds.width)
    py.set((event.clientY - bounds.top) / bounds.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <Tag
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      className={cn('group relative will-change-transform', className)}
      {...rest}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: light }}
      />
      {/* The ember border lights up on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition-all duration-500 group-hover:border-sun/70 group-hover:shadow-[0_0_50px_-6px_rgba(200,54,10,0.55)]"
      />
    </Tag>
  )
}

function PhotoCard({ item, index }) {
  return (
    <motion.div
      className={cn('flex min-h-[19rem] md:min-h-0', item.layout)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: (index % 3) * 0.08, ease: EASE_OUT_EXPO }}
    >
      <TiltCard className="flex flex-1 flex-col justify-end rounded-2xl">
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-ink">
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full scale-105 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12] [filter:saturate(1.2)_contrast(1.06)_brightness(0.95)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        </div>
        <div className="relative p-5 [transform-style:preserve-3d] md:p-6" style={{ transform: 'translateZ(40px)' }}>
          <span aria-hidden="true" className="block h-px w-10 bg-sun" />
          <h3 className="mt-3 font-display text-2xl text-white md:text-3xl">{item.title}</h3>
          <p className="font-marker mt-2 text-sm text-white/75 md:text-base">{item.note}</p>
        </div>
      </TiltCard>
    </motion.div>
  )
}

// The signature sauce: a solid 3D bottle on a turntable. It sways on its own, the whole card tilts
// toward the pointer, and every layer sits at its own depth so the parallax is real.
const HEAT = [
  { label: 'Mild', flames: 1 },
  { label: 'Medium', flames: 2 },
  { label: 'Hot', flames: 3 },
]

function SauceCard() {
  return (
    <motion.div
      className="flex min-h-[33rem] md:col-span-4 md:row-span-2 md:min-h-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: 0.16, ease: EASE_OUT_EXPO }}
    >
      <TiltCard as={MotionLink} to="/enquiry" className="flex flex-1 rounded-2xl" aria-label="Bros BBQ Sauce, ask about the sauce">
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A110B] via-[#160D0A] to-ink">
          <div className="absolute -right-[8%] top-1/2 h-[120%] w-[70%] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(200,54,10,0.5),rgba(200,54,10,0.16)_55%,transparent)]" />
          <Smoke tone="dark" plumes={2} wisps={3} className="!-z-0" />
        </div>

        <div className="relative grid w-full items-center gap-2 p-6 [transform-style:preserve-3d] md:grid-cols-[1.05fr_1fr] md:p-8">
          <div style={{ transform: 'translateZ(40px)' }}>
            <ExitSign exit="03" className="text-white">
              The Sauce
            </ExitSign>
            <h3 className="mt-4 font-display text-3xl leading-tight text-white md:text-5xl">Bros BBQ Sauce</h3>
            <p className="mt-3 max-w-sm text-balance text-base leading-relaxed text-white/70">Sweet, smoky or spicy. Pick your heat, then put it on everything</p>
            <ul aria-label="Heat levels" className="mt-5 flex flex-wrap gap-2.5">
              {HEAT.map((level) => (
                <li key={level.label} className="flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1">
                  <span className="flex" aria-hidden="true">
                    {Array.from({ length: level.flames }).map((_, i) => (
                      <Flame key={i} size={14} className="-mr-0.5 fill-sun text-sun" strokeWidth={1.5} />
                    ))}
                  </span>
                  <span className="font-cond text-xs tracking-[0.2em] text-white">{level.label}</span>
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-chili px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-ember transition-colors group-hover:bg-flame">
              Ask about the sauce
              <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>

          {/* The stage: a turntable with the bottle turning on it */}
          <div className="relative flex h-[19rem] items-end justify-center [transform-style:preserve-3d] md:h-[30rem]" style={{ transform: 'translateZ(60px)' }}>
            <div aria-hidden="true" className="absolute bottom-3 h-12 w-56 rounded-[50%] border border-sun/70 bg-[radial-gradient(closest-side,rgba(200,54,10,0.35),rgba(200,54,10,0.05))] shadow-[0_0_40px_-4px_rgba(200,54,10,0.6)] md:w-72" />
            <div aria-hidden="true" className="absolute bottom-[1.1rem] h-7 w-40 rounded-[50%] bg-black/60 blur-[3px] md:w-52" />
            <motion.div
              className="relative mb-9 h-60 will-change-transform md:h-[25rem]"
              style={{ transformStyle: 'preserve-3d', transformPerspective: 900 }}
              animate={{ rotateY: [-38, 38, -38], y: [0, -8, 0] }}
              transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
            >
              <SauceBottle depth={26} className="h-full" />
            </motion.div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function PremiumMenu() {
  return (
    <section id="menu" className="ember-glow relative isolate scroll-mt-0 overflow-hidden bg-ink px-6 pb-16 pt-20 text-white md:pb-24 md:pt-24">
      <Scallop />
      <Smoke tone="dark" plumes={3} wisps={3} />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="relative mb-10 md:mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        >
          <ExitSign exit="02" className="text-white">
            The Menu
          </ExitSign>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-[1.02] text-white [text-wrap:balance] md:text-7xl">Come hungry, leave happy</h2>
          <p className="font-marker mt-5 text-base text-sun md:text-lg">Every plate cooked over real fire, for every age</p>
          <div className="pointer-events-none absolute bottom-0 right-0 hidden items-end gap-3 md:flex lg:right-8">
            <p className="font-cond relative mb-14 max-w-[13rem] rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-xs leading-snug tracking-[0.14em] text-white/85 backdrop-blur">
              Allergies or dietary needs? Tell us and we will cook around you
              <span aria-hidden="true" className="absolute -right-1.5 bottom-3 h-3 w-3 rotate-45 border-r border-t border-white/15 bg-[#1b100c]" />
            </p>
            <FlameBro className="h-40 w-auto lg:h-48" />
          </div>
        </motion.div>

        <div className="grid gap-6 md:auto-rows-[15rem] md:grid-cols-6 lg:auto-rows-[17rem]">
          {SHOWCASE.slice(0, 3).map((item, index) => (
            <PhotoCard key={item.title} item={item} index={index} />
          ))}
          <PhotoCard item={SHOWCASE[3]} index={3} />
          <SauceCard />
        </div>
      </div>
    </section>
  )
}
