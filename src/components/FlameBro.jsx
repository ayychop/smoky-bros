import { motion } from 'framer-motion'
import { useId } from 'react'

// The Smoky Bros mascot: a flame in sunglasses with a big grin. He works on his own, as a sticker,
// and he is also the face of the badge in Logo.
export const INK = '#14100E'
const WHITE = '#FFFFFF'

const FLAME =
  'M104 4 C106 30 126 40 138 60 C142 52 146 46 146 38 C166 66 166 104 154 132 C148 156 130 176 106 180 C94 182 86 182 76 178 C48 168 36 140 40 114 C42 98 48 88 56 78 C58 90 64 94 70 94 C66 74 74 56 88 40 C94 32 102 22 104 4 Z'
const BELLY =
  'M102 84 C104 98 124 106 128 128 C132 152 118 170 102 170 C84 170 70 154 72 134 C74 114 96 106 102 84 Z'

// Smoke rising off the top of the flame. Each puff starts small and warm right at the tip, then swells,
// sways, cools to white and fades, and the next one follows close behind, so it reads as one soft column.
const PUFFS = Array.from({ length: 14 }, (_, i) => ({
  delay: i * 0.4,
  sway: (i % 2 ? 1 : -1) * (8 + (i % 3) * 5),
  rise: 84 + (i % 3) * 12,
  grow: 22 + (i % 4) * 3,
}))
const PUFF_TIME = 5.6

export function SmokeColumn({ uid, x = 104, y = 2 }) {
  const warm = `smokeWarm${uid}`
  const cool = `smokeCool${uid}`
  return (
    <g aria-hidden="true">
      <defs>
        <radialGradient id={warm}>
          <stop offset="0" stopColor="#FFC9A0" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#FF8A4D" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FF6A13" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={cool}>
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#E9E4DF" stopOpacity="0.32" />
          <stop offset="1" stopColor="#CFC8C2" stopOpacity="0" />
        </radialGradient>
      </defs>
      {PUFFS.map((puff, index) => (
        <motion.circle
          key={index}
          fill={`url(#${cool})`}
          initial={{ opacity: 0, cx: x, cy: y, r: 5 }}
          animate={{
            cx: [x, x + puff.sway * 0.4, x + puff.sway],
            cy: [y, y - puff.rise * 0.45, y - puff.rise],
            r: [5, puff.grow * 0.6, puff.grow],
            opacity: [0, 0.85, 0],
          }}
          transition={{ duration: PUFF_TIME, delay: puff.delay, ease: 'easeOut', repeat: Infinity, times: [0, 0.3, 1] }}
        />
      ))}
      {/* A warm glow where the smoke is still hot, right above the tip */}
      {PUFFS.slice(0, 5).map((puff, index) => (
        <motion.circle
          key={`warm${index}`}
          fill={`url(#${warm})`}
          initial={{ opacity: 0, cx: x, cy: y, r: 3 }}
          animate={{
            cx: [x, x + puff.sway * 0.2, x + puff.sway * 0.35],
            cy: [y + 2, y - 16, y - 34],
            r: [2, 9, 15],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 2.6, delay: index * 0.52, ease: 'easeOut', repeat: Infinity }}
        />
      ))}
    </g>
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
      {smoke && <SmokeColumn uid={uid} />}
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
      <FlameBroArt uid={uid} alive={alive} sticker={sticker} />
    </svg>
  )
}
