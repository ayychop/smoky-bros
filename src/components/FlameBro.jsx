import { motion } from 'framer-motion'
import { useId } from 'react'
import usePauseOffscreen from '../lib/usePauseOffscreen'
import { BELLY, FLAME, INK } from './flameShapes'
import { FlameBroFace, LiveFlameBody } from './LiveFlame'

// The Smoky Bros mascot: a flame in sunglasses with a big grin. He works on his own, as a sticker,
// and he is also the face of the badge in Logo.
export { INK }
const WHITE = '#FFFFFF'

// Smoke rising off the top of the flame. Each puff starts small and warm right at the tip, then swells,
// sways, cools to white and fades, and the next one follows close behind, so it reads as one soft column.
const PUFFS = Array.from({ length: 14 }, (_, i) => ({
  delay: i * 0.4,
  sway: (i % 2 ? 1 : -1) * (8 + (i % 3) * 5),
  rise: 84 + (i % 3) * 12,
  grow: 22 + (i % 4) * 3,
}))

// The mascot's box, in the units his drawing is made in. Every layer below is placed against it in percentages.
const VIEW = { x: 22, y: -12, w: 162, h: 212 }
const TIP = { x: 104, y: 2 }
const pct = (value, of) => `${(value / of) * 100}%`

// Smoke is drawn as plain elements rather than SVG shapes. An SVG that animates its own insides has to be
// repainted in full on every frame; an element that only moves and fades is handed to the GPU once and left alone.
function puffStyle(puff) {
  const size = puff.grow * 2
  return {
    left: pct(TIP.x - VIEW.x - puff.grow, VIEW.w),
    top: pct(TIP.y - VIEW.y - puff.grow, VIEW.h),
    width: pct(size, VIEW.w),
    aspectRatio: '1',
    animationDelay: `${puff.delay}s`,
    '--s0': 5 / puff.grow,
    '--dx': pct(puff.sway, size),
    '--dy': pct(-puff.rise, size),
  }
}

function warmStyle(puff, index) {
  const size = 30
  return {
    left: pct(TIP.x - VIEW.x - 15, VIEW.w),
    top: pct(TIP.y + 2 - VIEW.y - 15, VIEW.h),
    width: pct(size, VIEW.w),
    aspectRatio: '1',
    animationDelay: `${index * 0.52}s`,
    '--s0': 2 / 15,
    '--mx': pct(puff.sway * 0.2, size),
    '--my': pct(-18, size),
    '--dx': pct(puff.sway * 0.35, size),
    '--dy': pct(-36, size),
  }
}

function SmokeColumn() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {PUFFS.map((puff, index) => (
        <span key={index} className="fb-puff" style={puffStyle(puff)} />
      ))}
      {PUFFS.slice(0, 5).map((puff, index) => (
        <span key={`warm${index}`} className="fb-warm" style={warmStyle(puff, index)} />
      ))}
    </div>
  )
}

/**
 * The mascot's drawing, without an svg around it, so the badge can place it inside itself.
 * Pass the same `uid` to everything drawn in one svg so the gradient ids stay unique.
 */
export function FlameBroArt({ uid, alive = false, sticker = false }) {
  const flame = `flame${uid}`
  const belly = `belly${uid}`

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id={flame} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF8A1F" />
          <stop offset="1" stopColor="#DC2A0B" />
        </linearGradient>
        <linearGradient id={belly} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD7B0" />
          <stop offset="1" stopColor="#FF9A2E" />
        </linearGradient>
      </defs>

      <motion.g
        animate={alive ? { y: [0, -6, 0] } : undefined}
        transition={alive ? { duration: 3.6, ease: 'easeInOut', repeat: Infinity } : undefined}
      >
        {/* The whole bro breathes with the fire, face and body together, rooted at his feet */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
          animate={
            alive
              ? {
                  scaleY: [1, 1.025, 0.985, 1.02, 1],
                  scaleX: [1, 0.99, 1.01, 0.992, 1],
                }
              : undefined
          }
          transition={alive ? { duration: 1.6, ease: 'easeInOut', repeat: Infinity } : undefined}
        >
          {sticker && (
            <>
              <path d={FLAME} fill={WHITE} stroke={WHITE} strokeWidth="26" />
              <path d={FLAME} fill={INK} stroke={INK} strokeWidth="15" />
            </>
          )}
          <path d={FLAME} fill={`url(#${flame})`} stroke={INK} strokeWidth="7" />
          <path d={BELLY} fill={`url(#${belly})`} />

        {/* Sunglasses */}
        <rect x="62" y="98" width="36" height="26" rx="10" fill={INK} />
        <rect x="102" y="98" width="36" height="26" rx="10" fill={INK} />
        <path d="M98 106 L102 106" stroke={INK} strokeWidth="6" />
        <path d="M70 104 L78 104 L72 114 L68 114 Z" fill={WHITE} opacity=".85" />
        <path d="M110 104 L118 104 L112 114 L108 114 Z" fill={WHITE} opacity=".85" />

        {/* The grin */}
        <path d="M80 136 Q100 164 120 136 Z" fill={INK} stroke={INK} strokeWidth="5" />
        <path d="M84 139 Q100 148 116 139 L114 144 Q100 153 86 144 Z" fill={WHITE} />
        <ellipse cx="100" cy="154" rx="8" ry="4.5" fill="#E02B0B" />
        <ellipse cx="68" cy="134" rx="6" ry="4" fill="#FF5A1F" opacity=".75" />
        <ellipse cx="132" cy="134" rx="6" ry="4" fill="#FF5A1F" opacity=".75" />
        </motion.g>
      </motion.g>
    </g>
  )
}

/**
 * @param alive   Flicker the flame and let him bob
 * @param smoke   Curl smoke off his head (on by default when he is alive)
 * @param sticker Wrap him in a white die cut sticker outline, for use on bright colours
 * @param glow    A warm ember glow behind him, for dark backgrounds
 */
export default function FlameBro({ className = 'h-48 w-auto', alive = true, smoke = alive, sticker = false, glow = true }) {
  const uid = useId().replace(/:/g, '')
  const paused = usePauseOffscreen()

  // Standing still: one plain drawing, painted once
  if (!alive && !smoke) {
    return (
      <svg
        viewBox="22 -12 162 212"
        role="img"
        aria-label="The Smoky Bros flame mascot in sunglasses"
        shapeRendering="geometricPrecision"
        className={className}
        fill="none"
        overflow="visible"
      >
        {glow && (
          <>
            <defs>
              <radialGradient id={`aura${uid}`} cx="0.5" cy="0.55" r="0.5">
                <stop offset="0" stopColor="#FF5A1F" stopOpacity="0.5" />
                <stop offset="0.6" stopColor="#D92B0B" stopOpacity="0.14" />
                <stop offset="1" stopColor="#D92B0B" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="103" cy="100" rx="150" ry="170" fill={`url(#aura${uid})`} aria-hidden="true" />
          </>
        )}
        <FlameBroArt uid={uid} alive={false} sticker={sticker} />
      </svg>
    )
  }

  // Alive: the drawing never changes, so it is painted once and the GPU does the bobbing and breathing.
  // The smoke and the glow sit behind him as their own layers. The wrapper takes its width from the drawing.
  return (
    <div ref={paused} className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? '' : 'relative'} ${className}`} style={{ width: 'fit-content' }}>
      {smoke && <SmokeColumn />}
      {glow && (
        <div
          aria-hidden="true"
          className="fb-aura pointer-events-none absolute"
          style={{
            left: pct(103 - 150 - VIEW.x, VIEW.w),
            top: pct(100 - 170 - VIEW.y, VIEW.h),
            width: pct(300, VIEW.w),
            height: pct(340, VIEW.h),
            background: 'radial-gradient(50% 50% at 50% 55%, rgba(255,90,31,0.5) 0%, rgba(217,43,11,0.14) 60%, rgba(217,43,11,0) 100%)',
          }}
        />
      )}
      <div className={`relative h-full ${alive ? 'fb-bob' : ''}`}>
        {sticker ? (
          <svg
            viewBox="22 -12 162 212"
            role="img"
            aria-label="The Smoky Bros flame mascot in sunglasses"
            shapeRendering="geometricPrecision"
            className={`block h-full w-auto ${alive ? 'fb-breathe' : ''}`}
            fill="none"
            overflow="visible"
          >
            <FlameBroArt uid={uid} alive={false} sticker />
          </svg>
        ) : (
          <div className={`relative h-full ${alive ? 'fb-breathe' : ''}`}>
            {/* The flame: its outline is the only thing that is redrawn, and it is a small shape */}
            <svg
              viewBox="22 -12 162 212"
              role="img"
              aria-label="The Smoky Bros flame mascot in sunglasses"
              shapeRendering="geometricPrecision"
              className="block h-full w-auto"
              fill="none"
              overflow="visible"
            >
              <LiveFlameBody uid={uid} animated={alive} />
            </svg>
            {/* The face: painted once and left alone, on a layer of its own */}
            <svg
              viewBox="22 -12 162 212"
              aria-hidden="true"
              shapeRendering="geometricPrecision"
              className="absolute inset-0 h-full w-full [transform:translateZ(0)]"
              fill="none"
              overflow="visible"
            >
              <FlameBroFace uid={uid} />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
