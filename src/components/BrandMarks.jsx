import { useId } from 'react'

// The three concept marks for the brand deck. Each one is pure SVG on a 240 square canvas.
// Palette: Deep Charcoal #050505, Smoked Ember #C8360A, Fire Gold #FFB703, Warm Ash #F5F5F5.

const FLAME = 'M120 26 C134 52 160 66 160 102 C160 128 142 146 120 146 C98 146 80 128 80 102 C80 86 88 76 95 66 C98 82 107 88 113 86 C110 64 112 44 120 26 Z'
const FLAME_CORE = 'M120 84 C127 98 138 105 138 119 C138 131 130 138 120 138 C110 138 102 131 102 119 C102 110 108 104 111 96 C114 103 118 104 119 101 C118 95 118 90 120 84 Z'

// 1. The Monolith: a tall crest cut like a hero's chest plate, with the flame set inside
export function MonolithMark({ className = '' }) {
  const id = useId()
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label="Monolith crest logo for Smoky Bros BBQ" className={className}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0450F" />
          <stop offset="1" stopColor="#8F2504" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD25A" />
          <stop offset="1" stopColor="#F29A00" />
        </linearGradient>
      </defs>
      {/* Outer gold frame */}
      <path d="M66 10 H174 L226 66 L120 232 L14 66 Z" fill={`url(#${id}-gold)`} />
      {/* Ember body */}
      <path d="M69 20 H171 L214 67 L120 215 L26 67 Z" fill={`url(#${id}-body)`} />
      {/* Fine inner keyline */}
      <path d="M72 29 H168 L204 68 L120 200 L36 68 Z" fill="none" stroke="#FFB703" strokeOpacity="0.55" strokeWidth="1.2" />
      {/* A small flame crowning a bold S */}
      <path transform="translate(72 22) scale(0.4)" d={FLAME} fill={`url(#${id}-gold)`} />
      <text x="120" y="168" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="104" fill="#F5F5F5">
        S
      </text>
    </svg>
  )
}

// 2. The Crown: five flames for five points, on a heavy band
export function CrownMark({ className = '' }) {
  const id = useId()
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label="Crown logo for Smoky Bros BBQ" className={className}>
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD25A" />
          <stop offset="1" stopColor="#F29A00" />
        </linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0450F" />
          <stop offset="1" stopColor="#8F2504" />
        </linearGradient>
      </defs>
      {/* Crown body: five peaks joined by shallow valleys */}
      <path
        d="M34 176 L24 82 C24 78 28 76 31 79 L72 118 L106 50 C110 42 130 42 134 50 L168 118 L209 79 C212 76 216 78 216 82 L206 176 Z"
        fill={`url(#${id}-gold)`}
      />
      {/* Light edge down the left of every peak */}
      <path d="M31 84 L40 168 M106 54 L84 108 M168 118 L134 54" stroke="#FFF3C4" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Flame tips */}
      {[
        { x: 28, y: 52, s: 0.5 },
        { x: 120, y: 6, s: 0.62 },
        { x: 212, y: 52, s: 0.5 },
      ].map((flame) => (
        <path
          key={flame.x}
          transform={`translate(${flame.x - 120 * flame.s} ${flame.y - 26 * flame.s}) scale(${flame.s})`}
          d={FLAME}
          fill="#C8360A"
        />
      ))}
      {/* Band */}
      <rect x="30" y="182" width="180" height="30" rx="6" fill={`url(#${id}-band)`} />
      <rect x="30" y="182" width="180" height="30" rx="6" fill="none" stroke="#FFB703" strokeOpacity="0.7" strokeWidth="1.6" />
      {/* Jewels */}
      {[62, 120, 178].map((x) => (
        <g key={x}>
          <circle cx={x} cy="197" r="7.5" fill="#050505" />
          <circle cx={x} cy="197" r="4.6" fill="#FFB703" />
        </g>
      ))}
      <circle cx="120" cy="136" r="9" fill="#C8360A" />
      <circle cx="120" cy="136" r="4" fill="#FFB703" />
    </svg>
  )
}

// 3. The Badge: a roadside seal, text running the full ring
export function BadgeMark({ className = '' }) {
  const id = useId()
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label="Badge logo for Smoky Bros BBQ" className={className}>
      <defs>
        <path id={`${id}-top`} d="M 36 120 A 84 84 0 0 1 204 120" />
        <path id={`${id}-bottom`} d="M 28 120 A 92 92 0 0 0 212 120" />
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD25A" />
          <stop offset="1" stopColor="#F29A00" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="120" r="114" fill="#C8360A" />
      <circle cx="120" cy="120" r="114" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="4" />
      <circle cx="120" cy="120" r="106" fill="none" stroke="#FFB703" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="120" cy="120" r="64" fill="#050505" />
      <circle cx="120" cy="120" r="64" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="2.4" />
      <text fontFamily="'Playfair Display', Georgia, serif" fontWeight="800" fontSize="21" letterSpacing="5" fill="#F5F5F5" textAnchor="middle">
        <textPath href={`#${id}-top`} startOffset="50%">SMOKY BROS BBQ</textPath>
      </text>
      <text fontFamily="Inter, sans-serif" fontWeight="700" fontSize="13.5" letterSpacing="5" fill="#FFB703" textAnchor="middle" dominantBaseline="hanging">
        <textPath href={`#${id}-bottom`} startOffset="50%">LOW AND SLOW</textPath>
      </text>
      {/* Side stars */}
      <path d="M26 120 l3 -7 l3 7 l-3 7 Z" fill="#FFB703" transform="translate(-2 0)" />
      <path d="M208 120 l3 -7 l3 7 l-3 7 Z" fill="#FFB703" transform="translate(2 0)" />
      {/* Flame at the heart */}
      <path transform="translate(120 119) scale(0.58) translate(-120 -86)" d={FLAME} fill={`url(#${id}-gold)`} />
      <path transform="translate(120 119) scale(0.58) translate(-120 -86)" d={FLAME_CORE} fill="#C8360A" />
    </svg>
  )
}
