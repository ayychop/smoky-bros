import { useId } from 'react'

// The Bros BBQ Sauce bottle, drawn in SVG so the label is ours and the art stays crisp at any size
const BODY = 'M62 40 H98 V84 C98 102 132 110 132 146 V322 C132 340 122 350 106 350 H54 C38 350 28 340 28 322 V146 C28 110 62 102 62 84 Z'

const LAYERS = 16

// The bottle with real depth: dozens of dark slices stacked behind the front face in 3D space,
// so when the bottle turns you see its thickness, like a solid object on a turntable.
// The parent needs `transform-style: preserve-3d` and a perspective to show it.
export default function SauceBottle({ className = 'h-full w-auto', depth = 0 }) {
  if (!depth) return <Bottle className={className} />

  return (
    <div className={`relative aspect-[160/370] ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {Array.from({ length: LAYERS }, (_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 160 370"
          className="absolute inset-0 h-full w-full"
          style={{ transform: `translateZ(${-((i + 1) * depth) / LAYERS}px)` }}
        >
          <path d={BODY} fill={i % 2 ? '#14100E' : '#3a0c04'} />
          <rect x="56" y="8" width="48" height="34" rx="6" fill="#14100E" />
        </svg>
      ))}
      <div className="absolute inset-0" style={{ transform: `translateZ(${depth * 0.04}px)` }}>
        <Bottle className="h-full w-full" />
      </div>
    </div>
  )
}

function Bottle({ className }) {
  const uid = useId().replace(/:/g, '')
  const glass = `glass${uid}`
  const sauce = `sauce${uid}`
  const gold = `gold${uid}`
  const clip = `clip${uid}`

  return (
    <svg viewBox="0 0 160 370" role="img" aria-label="A bottle of Bros BBQ Sauce" className={className} fill="none">
      <defs>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a0c04" />
          <stop offset="0.35" stopColor="#b02a0b" />
          <stop offset="0.6" stopColor="#E4501C" />
          <stop offset="1" stopColor="#4a1306" />
        </linearGradient>
        <linearGradient id={sauce} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.35" />
          <stop offset="0.4" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFB27A" />
          <stop offset="1" stopColor="#FF9A2E" />
        </linearGradient>
        <clipPath id={clip}>
          <path d={BODY} />
        </clipPath>
      </defs>

      {/* Cap */}
      <rect x="56" y="8" width="48" height="34" rx="6" fill="#0d0b0a" stroke="#2a2522" strokeWidth="1.5" />
      <rect x="56" y="30" width="48" height="5" fill={`url(#${gold})`} />

      {/* Glass and sauce */}
      <path d={BODY} fill={`url(#${glass})`} />
      <path d={BODY} fill={`url(#${sauce})`} />
      <g clipPath={`url(#${clip})`}>
        <rect x="38" y="120" width="9" height="220" rx="4.5" fill="#fff" opacity="0.2" />
        <rect x="116" y="150" width="4" height="170" rx="2" fill="#fff" opacity="0.08" />
      </g>
      <path d={BODY} stroke="#fff" strokeOpacity="0.12" strokeWidth="1.5" />

      {/* Label */}
      <rect x="34" y="178" width="92" height="130" rx="6" fill="#FFFFFF" stroke="#14100E" strokeWidth="3" />
      <rect x="40" y="184" width="80" height="118" rx="3" stroke="#C8360A" strokeWidth="1.5" />
      <path
        d="M80 194 L98 199 V220 C98 232 90 239 80 244 C70 239 62 232 62 220 V199 Z"
        fill="#C8360A"
        stroke="#14100E"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <polygon
        points="80,211 82.64,218.36 90.46,218.6 84.28,223.39 86.47,230.9 80,226.5 73.53,230.9 75.72,223.39 69.54,218.6 77.36,218.36"
        fill="#FFB703"
        stroke="#14100E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <text x="80" y="264" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="800" fontSize="10.5" textLength="58" lengthAdjust="spacing" fill="#14100E">
        BROS BBQ
      </text>
      <text x="80" y="283" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700" fontSize="12" textLength="38" lengthAdjust="spacing" fill="#C8360A">
        Sauce
      </text>
      <text x="80" y="297" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="4.8" letterSpacing="1.1" fill="#1a0f09" opacity="0.7">
        SWEET HEAT AND SMOKE
      </text>
    </svg>
  )
}
