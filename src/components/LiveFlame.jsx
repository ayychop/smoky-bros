import { useState } from 'react'
import { BELLY, INK } from './flameShapes'

// A flame that moves like fire. Real fire does not squash and stretch as one rigid shape: the tip whips about,
// the side tongues rise and fall out of step with each other, the body leans first one way then the other,
// and the hot core underneath shimmers at its own pace. So the outline is reshaped between a handful of poses,
// each tongue on its own rhythm, and the colours flare and settle.
//
// Only the flame's own outline is redrawn. The face is a separate drawing that never changes, and the smoke, the glow
// and the bob all stay on the graphics card, so this costs a tiny shape's worth of work per frame.

// The outline as a flat list of points, in the order the path draws them (move to the tip, then ten curves)
const POINTS = [
  [104, 4],
  [106, 30], [126, 40], [138, 60],
  [142, 52], [146, 46], [146, 38],
  [166, 66], [166, 104], [154, 132],
  [148, 156], [130, 176], [106, 180],
  [94, 182], [86, 182], [76, 178],
  [48, 168], [36, 140], [40, 114],
  [42, 98], [48, 88], [56, 78],
  [58, 90], [64, 94], [70, 94],
  [66, 74], [74, 56], [88, 40],
  [94, 32], [102, 22], [104, 4],
]

// Which points belong to which part of the flame, so each part can be pushed around on its own
const PART = {
  tip: [0, 1, 29, 30],
  right: [4, 5, 6, 7],
  notchRight: [2, 3],
  left: [19, 20, 21, 22],
  notchLeft: [23, 24, 25],
  shoulder: [26, 27, 28],
}

const toPath = (points) => {
  const f = (n) => Math.round(n * 10) / 10
  let d = `M${f(points[0][0])} ${f(points[0][1])}`
  for (let i = 1; i < points.length; i += 3) {
    d += ` C${points.slice(i, i + 3).map(([x, y]) => `${f(x)} ${f(y)}`).join(' ')}`
  }
  return `${d} Z`
}

// A pose says how far to push each part from its resting place, and how far the whole body leans (in drawing units).
// The lean grows with height, so the top sways and the feet stay planted, like a flame does.
const pose = ({ tip = [0, 0], right = [0, 0], left = [0, 0], notchRight = [0, 0], notchLeft = [0, 0], shoulder = [0, 0], lean = 0 }) => {
  const shifts = { tip, right, left, notchRight, notchLeft, shoulder }
  const moved = POINTS.map(([x, y]) => [x, y])
  Object.entries(shifts).forEach(([name, [dx, dy]]) => {
    PART[name].forEach((index) => {
      moved[index][0] += dx
      moved[index][1] += dy
    })
  })
  // Point 30 is the same place as point 0: keep the outline closed
  moved[30] = [...moved[0]]
  const sway = moved.map(([x, y]) => [x + lean * Math.max(0, (120 - y) / 120), y])
  return toPath(sway)
}

// Eight poses, deliberately uneven, so the loop never feels like a loop. The tip leads, the tongues answer.
const FLAME_POSES = [
  pose({}),
  pose({ tip: [-6, 7], right: [4, -9], left: [-2, 5], notchRight: [0, -3], notchLeft: [0, 2], lean: -4 }),
  pose({ tip: [5, -3], right: [-3, 5], left: [3, -9], notchRight: [-1, 3], notchLeft: [1, -3], shoulder: [2, 0], lean: 3 }),
  pose({ tip: [-3, -6], right: [2, -4], left: [-3, 3], notchRight: [1, -2], notchLeft: [0, 3], lean: -1 }),
  pose({ tip: [8, 6], right: [5, -6], left: [-1, 6], notchRight: [0, -4], notchLeft: [-1, 0], shoulder: [-2, 2], lean: 5 }),
  pose({ tip: [-4, 2], right: [-4, 8], left: [4, -6], notchRight: [-2, 3], notchLeft: [2, -4], lean: -3 }),
  pose({ tip: [2, -7], right: [3, -10], left: [-4, 2], notchRight: [1, -3], notchLeft: [0, 2], shoulder: [1, -2], lean: 2 }),
  pose({}),
]
const FLAME_TIMES = '0;0.13;0.29;0.42;0.61;0.77;0.9;1'
// Some moves are quick and settle softly (a gust), some are slow swells
const FLAME_SPLINES = [
  '0.3 0 0.2 1',
  '0.45 0 0.55 1',
  '0.2 0 0.3 1',
  '0.45 0 0.55 1',
  '0.3 0 0.2 1',
  '0.45 0 0.55 1',
  '0.3 0 0.2 1',
].join(';')

// The hot core: a smaller flame inside the big one, brighter, on its own rhythm
const CORE = [
  [104, 26],
  [105, 46], [122, 56], [127, 76],
  [131, 92], [124, 104], [108, 108],
  [100, 109.5], [100, 109.5], [96, 108],
  [82, 104], [77, 92], [81, 76],
  [85, 58], [99, 46], [104, 26],
]
const corePose = ({ tip = [0, 0], side = 0, lean = 0 }) => {
  const moved = CORE.map(([x, y]) => [x, y])
  ;[0, 1, 14, 15].forEach((i) => {
    moved[i][0] += tip[0]
    moved[i][1] += tip[1]
  })
  moved[15] = [...moved[0]]
  // The two flanks swell and shrink in turn
  ;[3, 4].forEach((i) => (moved[i][0] += side))
  ;[11, 12].forEach((i) => (moved[i][0] -= side))
  const f = (n) => Math.round(n * 10) / 10
  const swayed = moved.map(([x, y]) => [x + lean * Math.max(0, (112 - y) / 86), y])
  let d = `M${f(swayed[0][0])} ${f(swayed[0][1])}`
  for (let i = 1; i < swayed.length; i += 3) {
    d += ` C${swayed.slice(i, i + 3).map(([x, y]) => `${f(x)} ${f(y)}`).join(' ')}`
  }
  return `${d} Z`
}
const CORE_POSES = [
  corePose({}),
  corePose({ tip: [3, -8], side: 2, lean: 3 }),
  corePose({ tip: [-5, 3], side: -2, lean: -4 }),
  corePose({ tip: [4, -3], side: 3, lean: 2 }),
  corePose({ tip: [-2, -9], side: -1, lean: -2 }),
  corePose({}),
]
const CORE_TIMES = '0;0.2;0.42;0.63;0.82;1'
const CORE_SPLINES = ['0.3 0 0.2 1', '0.45 0 0.55 1', '0.3 0 0.2 1', '0.45 0 0.55 1', '0.3 0 0.2 1'].join(';')

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The flame's body: the outline, its outer colours and the hot core. Draw the face on top with FlameBroFace.
 * @param uid      Unique per drawing, so gradient ids never clash
 * @param animated Set false for a still picture
 */
export function LiveFlameBody({ uid, animated = true }) {
  const [still] = useState(reducedMotion)
  const move = animated && !still
  const flame = `liveFlame${uid}`
  const core = `liveCore${uid}`

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id={flame} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF8A1F">
            {move && <animate attributeName="stop-color" dur="2.7s" repeatCount="indefinite" values="#FF8A1F;#FFA52E;#FF8A1F;#FF7A14;#FF8A1F" keyTimes="0;0.25;0.5;0.8;1" />}
          </stop>
          <stop offset="1" stopColor="#DC2A0B" />
        </linearGradient>
        <linearGradient id={core} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD55C" />
          <stop offset="1" stopColor="#FF8A1F" />
        </linearGradient>
      </defs>

      <path d={FLAME_POSES[0]} fill={`url(#${flame})`} stroke={INK} strokeWidth="7">
        {move && (
          <animate
            attributeName="d"
            dur="3.3s"
            repeatCount="indefinite"
            values={FLAME_POSES.join(';')}
            keyTimes={FLAME_TIMES}
            calcMode="spline"
            keySplines={FLAME_SPLINES}
          />
        )}
      </path>

      <path d={CORE_POSES[0]} fill={`url(#${core})`} opacity="0.9">
        {move && (
          <animate
            attributeName="d"
            dur="2.3s"
            repeatCount="indefinite"
            values={CORE_POSES.join(';')}
            keyTimes={CORE_TIMES}
            calcMode="spline"
            keySplines={CORE_SPLINES}
          />
        )}
        {move && <animate attributeName="opacity" dur="1.7s" repeatCount="indefinite" values="0.9;0.7;0.95;0.78;0.9" keyTimes="0;0.3;0.55;0.8;1" />}
      </path>
    </g>
  )
}

/** The face that never changes: peach belly, shades, grin and rosy cheeks. */
export function FlameBroFace({ uid }) {
  const belly = `liveBelly${uid}`

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id={belly} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD7B0" />
          <stop offset="1" stopColor="#FF9A2E" />
        </linearGradient>
      </defs>
      <path d={BELLY} fill={`url(#${belly})`} />

      {/* Sunglasses */}
      <rect x="62" y="98" width="36" height="26" rx="10" fill={INK} />
      <rect x="102" y="98" width="36" height="26" rx="10" fill={INK} />
      <path d="M98 106 L102 106" stroke={INK} strokeWidth="6" />
      <path d="M70 104 L78 104 L72 114 L68 114 Z" fill="#FFFFFF" opacity=".85" />
      <path d="M110 104 L118 104 L112 114 L108 114 Z" fill="#FFFFFF" opacity=".85" />

      {/* The grin */}
      <path d="M80 136 Q100 164 120 136 Z" fill={INK} stroke={INK} strokeWidth="5" />
      <path d="M84 139 Q100 148 116 139 L114 144 Q100 153 86 144 Z" fill="#FFFFFF" />
      <ellipse cx="100" cy="154" rx="8" ry="4.5" fill="#E02B0B" />
      <ellipse cx="68" cy="134" rx="6" ry="4" fill="#FF5A1F" opacity=".75" />
      <ellipse cx="132" cy="134" rx="6" ry="4" fill="#FF5A1F" opacity=".75" />
    </g>
  )
}

