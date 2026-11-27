import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import FlameBro from '../components/FlameBro'
import Logo from '../components/Logo'
import Scallop from '../components/Scallop'
import Smoke from '../components/Smoke'
import Ticker from '../components/Ticker'
import { EASE_OUT_EXPO } from '../easing'

const COLOURS = [
  { name: 'Pit Black', hex: '#0C0908', use: 'The night sky and the pit. It is the stage everything else glows on', text: 'text-white', swatch: 'bg-ink' },
  { name: 'Chili Red', hex: '#D92B0B', use: 'The hot sauce. Buttons, ribbons and calls to action', text: 'text-white', swatch: 'bg-chili' },
  { name: 'Live Flame', hex: '#FF5A1F', use: 'The fire itself. Glows, hovers and anything alive', text: 'text-ink', swatch: 'bg-flame' },
  { name: 'Ember Orange', hex: '#FF6A13', use: 'The warm welcome. Highlights, numbers and the little sparks', text: 'text-ink', swatch: 'bg-sun' },
  { name: 'Smoke White', hex: '#FFFFFF', use: 'Headlines on black and clean space on light pages', text: 'text-ink', swatch: 'bg-white' },
  { name: 'Warm Paper', hex: '#F7F3EE', use: 'The light sections, easy on the eye and easy to read', text: 'text-ink', swatch: 'bg-cream' },
]

const VOICE = [
  { title: 'Warm like a friend', copy: 'We talk like the person holding the tongs. Easy, generous and glad you came', dark: true },
  { title: 'Confident, never loud', copy: 'Plain words, good food, and no need to shout. You will remember us anyway', dark: false },
  { title: 'Proud of the fire', copy: 'Low and slow is a promise. Every line should smell a little of smoke', dark: true },
]

const STATS = [
  { label: 'Target', value: 50, unit: 'UK Locations', tone: 'bg-sun text-ink' },
  { label: 'Expansion', text: 'Ghana and Nigeria', unit: '2028', tone: 'bg-chili text-white' },
  { label: 'Dominance', text: 'Global', unit: 'Franchise Model', tone: 'bg-ink text-white' },
]

function Section({ eyebrow, title, children, className = '' }) {
  return (
    <motion.section
      className={`mx-auto max-w-6xl px-6 pt-16 md:pt-20 ${className}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO }}
    >
      <p className="font-marker inline-flex items-center gap-4 text-sm text-sun"><span aria-hidden="true" className="h-px w-8 bg-sun" />{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ink md:text-6xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </motion.section>
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

// A stylised network, not a geographic map: three hubs and the routes between them
function Network() {
  const nodes = [
    { id: 'uk', label: 'United Kingdom', x: 300, y: 70 },
    { id: 'gh', label: 'Ghana', x: 238, y: 232 },
    { id: 'ng', label: 'Nigeria', x: 372, y: 246 },
  ]
  const routes = ['M300 70 C 250 130, 230 180, 238 232', 'M300 70 C 360 130, 380 190, 372 246', 'M238 232 C 280 270, 330 270, 372 246']

  return (
    <svg viewBox="0 0 600 320" role="img" aria-label="Stylised network linking the UK, Ghana and Nigeria" className="h-full w-full">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="#14100E" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="600" height="320" fill="url(#dots)" />
      {routes.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          stroke="#D92B0B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 9"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2, delay: 0.3 + index * 0.35, ease: EASE_OUT_EXPO }}
        />
      ))}
      {nodes.map((node, index) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="8"
            fill="none"
            stroke="#D92B0B"
            strokeWidth="2.5"
            animate={{ r: [8, 28], opacity: [0.9, 0] }}
            transition={{ duration: 3.2, delay: index * 0.9, ease: 'easeOut', repeat: Infinity }}
          />
          <circle cx={node.x} cy={node.y} r="8" fill="#FF6A13" stroke="#14100E" strokeWidth="3" />
          <text x={node.x + 18} y={node.y + 5} fill="#14100E" fontFamily="'Playfair Display', Georgia, serif" fontSize="13" letterSpacing="1.5">
            {node.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  )
}

const card = 'rounded-2xl border border-ink/10 shadow-sticker'

export default function BrandBoard() {
  return (
    <div className="paper pb-16">
      {/* Cover */}
      <header className="ember-glow relative isolate flex min-h-[88svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 pb-20 pt-32 text-center text-white">
        <Smoke tone="dark" plumes={4} embers={12} />
        <div className="relative mt-6 flex flex-col items-center gap-8 sm:flex-row sm:gap-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}>
            <FlameBro alive className="h-60 w-auto md:h-80" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2, ease: EASE_OUT_EXPO }}>
            <Logo className="h-48 w-48 drop-shadow-[0_18px_40px_rgba(0,0,0,0.6)] md:h-64 md:w-64" />
          </motion.div>
        </div>
        <motion.p
          className="font-cond relative mt-10 inline-flex items-center gap-4 text-sm tracking-[0.4em] text-sun"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE_OUT_EXPO }}
        >
          <span aria-hidden="true" className="h-px w-8 bg-sun" />
          Brand Board
          <span aria-hidden="true" className="h-px w-8 bg-sun" />
        </motion.p>
        <motion.h1
          className="relative mt-5 font-display text-6xl leading-none md:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE_OUT_EXPO }}
        >
          Made in <span className="text-sun">Smoke</span>
        </motion.h1>
        <motion.p
          className="font-cond relative mt-6 text-sm tracking-[0.4em] text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          Low and slow, ready to go
        </motion.p>
      </header>

      <div className="relative border-y border-white/10 bg-ink py-4">
        <Ticker label="Smoky Bros BBQ" duration={40}>
          {['Smoked low and slow', 'Cooked over live fire', 'Made in Maidenhead', 'Ready to go', 'Smoked low and slow', 'Cooked over live fire'].map((text, index) => (
            <span key={`${text}-${index}`} className="font-cond flex shrink-0 items-center whitespace-nowrap text-base tracking-[0.3em] text-white/75 md:text-xl">
              {text}
              <span aria-hidden="true" className="mx-8 h-1.5 w-1.5 rotate-45 bg-sun md:mx-10" />
            </span>
          ))}
        </Ticker>
      </div>

      {/* Logo */}
      <Section eyebrow="The marks" title="One badge, one flame">
        <div className="grid gap-6 md:grid-cols-3">
          <div className={`${card} flex min-h-[20rem] items-center justify-center bg-ink p-10 md:col-span-2`}>
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
              <figure className="flex flex-col items-center gap-3">
                <Logo alive className="h-52 w-52" />
                <figcaption className="font-cond text-xs tracking-[0.35em] text-sun">Primary logo</figcaption>
              </figure>
              <figure className="flex flex-col items-center gap-3">
                <FlameBro alive className="h-40 w-auto" />
                <figcaption className="font-cond text-xs tracking-[0.35em] text-sun">Secondary logo</figcaption>
              </figure>
            </div>
          </div>
          <div className={`${card} flex min-h-[20rem] flex-col items-center justify-center gap-6 bg-cream p-10`}>
            <Logo className="h-36 w-36" />
            <p className="font-marker text-sm text-ink/70">On paper</p>
          </div>
          <div className={`${card} flex items-end justify-center gap-8 bg-ink p-10 md:col-span-3`}>
            {[
              { cls: 'h-24', size: 96 },
              { cls: 'h-16', size: 64 },
              { cls: 'h-10', size: 40 },
              { cls: 'h-6', size: 24 },
            ].map(({ cls, size }) => (
              <div key={size} className="flex flex-col items-center gap-3">
                <Logo className={`${cls} w-auto`} />
                <span className="font-marker text-xs text-white/70">{size}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Colour */}
      <Section eyebrow="Colour" title="Forge, fire and ash">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COLOURS.map((colour) => (
            <div key={colour.hex} className={`${card} overflow-hidden bg-white`}>
              <div className={`flex h-36 items-end border-b border-ink/10 p-5 ${colour.swatch} ${colour.text}`}>
                <span className="font-display text-xl tracking-wide">{colour.hex}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-ink">{colour.name}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink/70">{colour.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Type */}
      <Section eyebrow="Typography" title="Classic serif, quiet caps">
        <div className="grid gap-6 md:grid-cols-3">
          <div className={`${card} bg-ink p-8 text-white`}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sun">Playfair Display</p>
            <p className="mt-5 font-display text-7xl leading-none">Aa</p>
            <p className="mt-5 font-display text-2xl">From the Pit to the Plate</p>
            <p className="mt-3 text-sm font-medium opacity-85">For headlines, the confident voice of the brand</p>
          </div>
          <div className={`${card} bg-chili p-8 text-white`}>
            <p className="text-xs font-bold uppercase tracking-[0.3em]">Barlow Condensed</p>
            <p className="mt-5 font-marker text-7xl leading-none">Aa</p>
            <p className="mt-5 font-marker text-2xl">Fire on, hunger off</p>
            <p className="mt-3 text-sm font-medium">For labels, captions and the small print of the roadside</p>
          </div>
          <div className={`${card} bg-white p-8 text-ink`}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-chili">Inter</p>
            <p className="mt-5 text-7xl font-extrabold leading-none">Aa</p>
            <p className="mt-5 text-xl font-semibold">Premium BBQ catering in Maidenhead, Berkshire</p>
            <p className="mt-3 text-sm font-medium text-ink/70">For body copy, buttons and small print</p>
          </div>
        </div>
      </Section>

      {/* Voice */}
      <Section eyebrow="Personality" title="Inviting and cool">
        <div className="grid gap-6 md:grid-cols-3">
          {VOICE.map((item) => (
            <div key={item.title} className={`${card} p-8 ${item.dark ? 'bg-ink text-white' : 'bg-white text-ink'}`}>
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-4 leading-relaxed opacity-75">{item.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Future */}
      <section className="ember-glow relative isolate mt-20 overflow-hidden bg-ink px-6 pb-20 pt-24 text-white">
        <Smoke tone="dark" plumes={3} />
        <Scallop />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-marker inline-flex items-center gap-4 text-sm text-sun"><span aria-hidden="true" className="h-px w-8 bg-sun" />The road ahead</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-6xl">The Future of Smoke</h2>
          <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-5">
            <div className={`${card} min-h-[18rem] overflow-hidden bg-white p-4 text-ink lg:col-span-3`}>
              <Network />
            </div>
            <div className="grid gap-6 lg:col-span-2">
              {STATS.map((stat) => (
                <div key={stat.label} className={`${card} p-7 ${stat.tone}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.35em] opacity-80">{stat.label}</p>
                  <p className="mt-2 font-display text-4xl leading-tight md:text-5xl">{stat.value ? <CountUp to={stat.value} /> : stat.text}</p>
                  <p className="mt-1 text-sm font-bold uppercase tracking-[0.22em] opacity-80">{stat.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
