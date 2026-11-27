import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { EASE_OUT_EXPO } from '../easing'
import FlameBro from './FlameBro'
import Logo from './Logo'

const MARKS = [
  { id: 'main', numeral: 'I', name: 'The Main Logo', note: 'The badge. For the trailer, the menu board and anywhere we sign our name', Mark: Logo, markClass: 'h-full w-full' },
  { id: 'second', numeral: 'II', name: 'The Second Logo', note: 'The flame bro. For the playful moments, the socials and the stickers', Mark: FlameBro, markClass: 'h-[80%] w-auto' },
]

const COLOURS = [
  { name: 'Deep Charcoal', hex: '#050505', swatch: 'bg-[#050505] ring-1 ring-white/25' },
  { name: 'Smoked Ember', hex: '#C8360A', swatch: 'bg-[#C8360A]' },
  { name: 'Fire Gold', hex: '#FFB703', swatch: 'bg-[#FFB703]' },
  { name: 'Warm Ash', hex: '#F5F5F5', swatch: 'bg-[#F5F5F5]' },
]

const STATS = [
  { label: 'Target', value: 50, unit: 'UK Locations' },
  { label: 'Expansion', text: 'Ghana and Nigeria', unit: '2028' },
]

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1, ease: EASE_OUT_EXPO },
}

function Eyebrow({ children }) {
  return (
    <p className="balance-track flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-[#FFB703]">
      <span aria-hidden="true" className="h-px w-8 bg-[#FFB703]/60" />
      {children}
      <span aria-hidden="true" className="h-px w-8 bg-[#FFB703]/60" />
    </p>
  )
}

function Slide({ eyebrow, title, children, className = '' }) {
  return (
    <section className={`relative mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}>
      <motion.div {...reveal} className="text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-4xl leading-[1.05] text-[#F5F5F5] md:text-6xl">{title}</h2>
      </motion.div>
      <div className="mt-14 md:mt-20">{children}</div>
    </section>
  )
}

function CountUp({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const value = useMotionValue(0)
  const rounded = useTransform(value, (latest) => Math.round(latest))

  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(value, to, { duration: 2.2, ease: EASE_OUT_EXPO })
    return () => controls.stop()
  }, [inView, to, value])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

// A client pitch page: keep it out of search results
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
}

export default function BrandBoard() {
  useNoIndex()

  return (
    <main className="relative overflow-hidden bg-[#050505] text-[#F5F5F5]">
      {/* Quiet ember light that sits behind the whole deck */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[120svh] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(200,54,10,0.28),transparent_70%)]" />

      <Link
        to="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40 transition-colors duration-300 hover:text-[#FFB703] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB703] md:left-8 md:top-8"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Back to site
      </Link>

      {/* Cover */}
      <header className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}>
          <Eyebrow>Brand Identity</Eyebrow>
        </motion.div>
        <motion.h1
          className="mt-8 font-display text-6xl leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: EASE_OUT_EXPO }}
        >
          Smoky Bros
          <span className="font-cond balance-track mt-3 block bg-gradient-to-b from-[#FFD25A] to-[#C8360A] bg-clip-text text-[0.6em] font-semibold tracking-[0.35em] text-transparent">BBQ</span>
        </motion.h1>
        <motion.p
          className="mt-8 max-w-md text-base leading-relaxed text-white/55 md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          The identity, the palette and the road ahead. Prepared for private presentation.
        </motion.p>
        <motion.div
          aria-hidden="true"
          className="absolute bottom-10 h-14 w-px bg-gradient-to-b from-[#FFB703] to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
      </header>

      {/* The logos */}
      <Slide eyebrow="The marks" title="Two ways to wear the fire">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {MARKS.map(({ id, numeral, name, note, Mark, markClass }, index) => (
            <motion.figure
              key={id}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.12 }}
              className="group flex flex-col items-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] px-8 pb-10 pt-12 text-center transition-colors duration-500 hover:border-[#FFB703]/40"
            >
              <div className="relative flex h-64 w-64 items-center justify-center md:h-72 md:w-72">
                <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[#C8360A]/25 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                <Mark className={`relative transition-transform duration-700 ease-out group-hover:scale-105 ${markClass}`} />
              </div>
              <figcaption className="mt-10">
                <p className="balance-track text-xs font-semibold uppercase tracking-[0.4em] text-[#FFB703]">{numeral}</p>
                <p className="mt-3 font-display text-2xl text-[#F5F5F5]">{name}</p>
                <p className="mx-auto mt-3 max-w-[17rem] text-balance text-sm leading-relaxed text-white/50">{note}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Slide>

      {/* Colour */}
      <Slide eyebrow="Colour" title="Forged in four tones">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {COLOURS.map((colour, index) => (
            <motion.div
              key={colour.hex}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`aspect-square w-full max-w-[13rem] rounded-full shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out hover:scale-105 ${colour.swatch}`} />
              <p className="mt-6 font-display text-xl text-[#F5F5F5]">{colour.name}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">{colour.hex}</p>
            </motion.div>
          ))}
        </div>
      </Slide>

      {/* Typography */}
      <Slide eyebrow="Typography" title="A classic voice, a clean hand">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div {...reveal} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB703]">Headings</p>
            <p className="mt-8 font-display text-8xl leading-none text-[#F5F5F5] md:text-9xl">Aa</p>
            <p className="mt-8 font-display text-3xl text-[#F5F5F5]">Playfair Display</p>
            <p className="mt-3 font-display text-xl italic text-white/60">From the pit to the plate</p>
            <p className="mt-6 text-sm leading-relaxed text-white/50">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz 0123456789</p>
          </motion.div>
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB703]">Body</p>
            <p className="mt-8 font-sans text-8xl font-semibold leading-none text-[#F5F5F5] md:text-9xl">Aa</p>
            <p className="mt-8 font-sans text-3xl font-semibold text-[#F5F5F5]">Inter</p>
            <p className="mt-3 font-sans text-xl text-white/60">Premium BBQ catering in Maidenhead</p>
            <p className="mt-6 text-sm leading-relaxed text-white/50">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz 0123456789</p>
          </motion.div>
        </div>
      </Slide>

      {/* Tagline */}
      <section className="relative flex min-h-[75svh] items-center justify-center px-6 py-24 text-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_50%,rgba(200,54,10,0.22),transparent_70%)]" />
        <motion.h2
          {...reveal}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
          className="font-lead relative text-[3.1rem] uppercase leading-[0.95] tracking-normal word-wide text-[#F5F5F5] min-[420px]:text-7xl sm:text-8xl md:text-9xl lg:text-[11rem]"
        >
          Low and slow
          <span className="block bg-gradient-to-r from-[#FFB703] via-[#FF6A13] to-[#C8360A] bg-clip-text text-transparent">ready to go</span>
        </motion.h2>
      </section>

      {/* Global vision */}
      <Slide eyebrow="The road ahead" title="The Future of Smoke" className="pb-32 md:pb-40">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.14 }}
              className="relative overflow-hidden rounded-3xl border border-[#FFB703]/25 bg-gradient-to-br from-[#C8360A]/30 via-white/[0.03] to-transparent p-9 text-center md:p-12"
            >
              <p className="balance-track text-xs font-semibold uppercase tracking-[0.4em] text-[#FFB703]">{stat.label}</p>
              <p className="mt-5 font-display text-6xl leading-none text-[#F5F5F5] md:text-7xl">
                {stat.value ? <CountUp to={stat.value} /> : <span className="block text-4xl leading-[1.1] md:text-5xl">{stat.text}</span>}
              </p>
              <p className={`balance-track text-sm font-semibold uppercase tracking-[0.3em] text-white/60 ${stat.value ? 'mt-5' : 'mt-4 text-2xl text-[#FFB703]'}`}>{stat.unit}</p>
            </motion.div>
          ))}
        </div>
      </Slide>

      <div className="relative border-t border-white/10 px-6 py-10 text-center">
        <p className="balance-track text-xs uppercase tracking-[0.3em] text-white/30">Smoky Bros BBQ, Confidential</p>
      </div>
    </main>
  )
}
