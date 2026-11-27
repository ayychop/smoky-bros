import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { EASE_OUT_EXPO } from '../easing'

// Letters that look cut from hot metal: a stack of one pixel shadows builds the thickness, a soft one grounds it
const EXTRUDE = [
  '1px 1px 0 #F2740F',
  '2px 2px 0 #E0680D',
  '3px 3px 0 #CC5C0B',
  '4px 4px 0 #B85109',
  '5px 5px 0 #A04508',
  '6px 6px 0 #883A07',
  '7px 7px 0 #6F2F06',
  '8px 8px 0 #582505',
  '9px 9px 0 #431C04',
  '16px 18px 26px rgba(0,0,0,0.65)',
].join(', ')

const THICKNESS = [8, 16, 24]

/**
 * A cast iron plate with real depth. Layers sit behind the face to give it thickness, the number and the
 * icon float in front of it, and the whole thing tilts toward the pointer. In a row, `lean` angles it
 * inward so the row curves around you, and hovering straightens it and steps it forward.
 *
 * @param number  The big extruded numeral
 * @param label   A small caption above the title
 * @param Icon    A lucide icon shown in a glowing ring (optional)
 * @param lean    Degrees to turn the plate on large screens, positive faces right, negative faces left
 */
export default function Plate({ number, label, title, copy, Icon, lean = 0, delay = 0 }) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), { stiffness: 140, damping: 16, mass: 0.5 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-13, 13]), { stiffness: 140, damping: 16, mass: 0.5 })

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
    <motion.li
      className="h-full [transform-style:preserve-3d]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease: EASE_OUT_EXPO }}
    >
      {/* The lean lives on its own layer, so the pointer tilt can stack on top of it */}
      <div
        className="h-full transition-transform duration-700 ease-out [transform-style:preserve-3d] lg:[transform:rotateY(var(--lean))] lg:hover:[transform:rotateY(0deg)_translateZ(50px)]"
        style={{ '--lean': `${lean}deg` }}
      >
        <motion.div
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          whileTap={{ scale: 0.97 }}
          style={{ rotateX, rotateY, transformPerspective: 1400, transformStyle: 'preserve-3d' }}
          className="group relative h-full min-h-[20rem] will-change-transform"
        >
          {/* The edge of the plate: dark layers stacked behind the face */}
          {THICKNESS.map((depth, index) => (
            <div
              key={depth}
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl border border-white/5"
              style={{ transform: `translateZ(-${depth}px)`, background: ['#2A1A12', '#1D120D', '#120B08'][index] }}
            />
          ))}

          {/* The face: dark metal with a hot glow rising from the bottom edge */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#2B1D17] via-[#171210] to-[#0C0908] transition-colors duration-500 group-hover:border-sun/70">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(200,54,10,0.5),transparent)] opacity-40 transition-opacity duration-700 group-hover:opacity-100" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            {/* A light sheen sweeps across the plate on hover */}
            <div aria-hidden="true" className="absolute -inset-y-4 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100" />
          </div>

          <span
            aria-hidden="true"
            className="absolute left-6 top-4 font-display text-[5.5rem] font-black leading-none text-sun"
            style={{ transform: 'translateZ(70px)', textShadow: EXTRUDE }}
          >
            {number}
          </span>

          {Icon && (
            <span
              className="absolute right-6 top-7 grid h-12 w-12 place-items-center rounded-full border border-sun/70 bg-ink/70 text-sun shadow-ember backdrop-blur"
              style={{ transform: 'translateZ(45px)' }}
            >
              <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
            </span>
          )}

          <div className="relative flex h-full flex-col justify-end p-7 pt-32" style={{ transform: 'translateZ(30px)' }}>
            {label && <p className="font-cond text-xs tracking-[0.3em] text-sun">{label}</p>}
            <h3 className="mt-2 font-display text-2xl leading-snug text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{copy}</p>
          </div>
        </motion.div>
      </div>
    </motion.li>
  )
}
