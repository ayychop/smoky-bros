import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { EASE_OUT_EXPO } from '../easing'
import { scrollToTarget } from '../lib/lenis'
import FlameBro from './FlameBro'
import Logo from './Logo'

// The chapters of the deck, in order. Drives the side index and the scroll cue.
const SECTIONS = [
  { id: 'cover', label: 'Cover' },
  { id: 'marks', label: 'Logos' },
  { id: 'colour', label: 'Colour' },
  { id: 'typography', label: 'Typography' },
  { id: 'guidelines', label: 'Guidelines' },
  { id: 'tagline', label: 'Tagline' },
  { id: 'future', label: 'The future' },
]

const GUIDELINES = [
  { title: 'Give it room', copy: 'Keep clear space around the logo, at least the height of the flame on every side.' },
  { title: 'Keep it legible', copy: 'The main logo never runs smaller than 64 pixels tall. Below that, use the flame bro.' },
  { title: 'Right ground only', copy: 'Place it on Deep Charcoal or Warm Ash. Never on busy photography.' },
  { title: 'Never distort', copy: 'No stretching, rotating, recolouring or added effects. The logo stays as drawn.' },
]

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
  { label: 'Milestone', value: 1000, unit: 'Events booked' },
  { label: 'Expansion', text: 'First stores opened', unit: 'Ghana, Nigeria, Dubai' },
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

function Slide({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}>
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
  const rounded = useTransform(value, (latest) => Math.round(latest).toLocaleString('en-GB'))

  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(value, to, { duration: 2.2, ease: EASE_OUT_EXPO })
    return () => controls.stop()
  }, [inView, to, value])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

const jumpTo = (id) => {
  const target = document.getElementById(id)
  if (target) scrollToTarget(target)
}

// A slim index on the right edge: shows where you are and lets you jump between chapters
function SectionIndex() {
  const [active, setActive] = useState('cover')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="Deck sections" className="fixed right-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-1 lg:flex">
      {SECTIONS.map(({ id, label }) => {
        const on = active === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => jumpTo(id)}
            aria-label={`Go to ${label}`}
            aria-current={on ? 'true' : undefined}
            className="group flex items-center gap-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB703]"
          >
            <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.25em] transition-all duration-500 ${on ? 'translate-x-0 text-[#FFB703] opacity-100' : 'translate-x-1 text-white/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>
              {label}
            </span>
            <span aria-hidden="true" className={`block w-px transition-all duration-500 ${on ? 'h-7 bg-[#FFB703]' : 'h-3 bg-white/25 group-hover:bg-white/60'}`} />
          </button>
        )
      })}
    </nav>
  )
}

// One brand rule, shown rather than told: a small stage for the demo, then the rule itself
function Guideline({ index, title, copy, children }) {
  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay: index * 0.1 }}
      className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 text-center"
    >
      <div className="flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/40">{children}</div>
      <p className="balance-track mt-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#FFB703]">{`0${index + 1}`}</p>
      <h3 className="mt-3 font-display text-xl text-[#F5F5F5]">{title}</h3>
      <p className="mx-auto mt-3 max-w-[16rem] text-balance px-1 pb-3 text-sm leading-relaxed text-white/50">{copy}</p>
    </motion.div>
  )
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

      <SectionIndex />

      <Link
        to="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40 transition-colors duration-300 hover:text-[#FFB703] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB703] md:left-8 md:top-8"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Back to site
      </Link>

      {/* Cover */}
      <header id="cover" className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-28 text-center">
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
        <motion.button
          type="button"
          onClick={() => jumpTo('marks')}
          className="group absolute bottom-8 flex flex-col items-center gap-4 px-6 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB703]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <span className="balance-track text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-white/60 transition-colors duration-300 group-hover:text-[#FFB703]">Scroll to explore</span>
          <span aria-hidden="true" className="relative block h-14 w-px overflow-hidden bg-white/15">
            <span
              className="cue-sweep absolute inset-x-0 top-0 block h-7 bg-gradient-to-b from-transparent via-[#FFB703] to-transparent"
              style={{ '--from': '-28px', '--to': '56px' }}
            />
          </span>
        </motion.button>
      </header>

      {/* The logos */}
      <Slide id="marks" eyebrow="The marks" title="Two ways to wear the fire">
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
      <Slide id="colour" eyebrow="Colour" title="Forged in four tones">
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
      <Slide id="typography" eyebrow="Typography" title="A classic voice, a clean hand">
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

      {/* Guidelines */}
      <Slide id="guidelines" eyebrow="Guidelines" title="How to wear it well">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Guideline index={0} {...GUIDELINES[0]}>
            <div className="border border-dashed border-[#FFB703]/50 p-5">
              <Logo className="h-24 w-24" />
            </div>
          </Guideline>
          <Guideline index={1} {...GUIDELINES[1]}>
            <div className="flex items-end gap-8">
              <figure className="flex flex-col items-center gap-3">
                <Logo className="h-16 w-16" />
                <figcaption className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50">64 px</figcaption>
              </figure>
              <figure className="flex flex-col items-center gap-3">
                <FlameBro className="h-9 w-auto" />
                <figcaption className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50">Smaller</figcaption>
              </figure>
            </div>
          </Guideline>
          <Guideline index={2} {...GUIDELINES[2]}>
            <div className="flex h-full w-full">
              <div className="flex w-1/2 items-center justify-center bg-[#050505]">
                <Logo className="h-20 w-20" />
              </div>
              <div className="flex w-1/2 items-center justify-center bg-[#F5F5F5]">
                <Logo className="h-20 w-20" />
              </div>
            </div>
          </Guideline>
          <Guideline index={3} {...GUIDELINES[3]}>
            <div className="relative">
              <Logo className="h-24 w-24 origin-center scale-x-[1.45] opacity-40" />
              <span aria-hidden="true" className="absolute left-1/2 top-1/2 block h-px w-[150%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[#C8360A]" />
            </div>
          </Guideline>
        </div>
      </Slide>

      {/* Tagline */}
      <section id="tagline" className="relative flex min-h-[75svh] items-center justify-center px-6 py-24 text-center">
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
      <Slide id="future" eyebrow="The road ahead" title="The Future of Smoke" className="pb-32 md:pb-40">
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
