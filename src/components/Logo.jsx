import { useId } from 'react'

const WHITE = '#F4F4F4'
const CIRCUMFERENCE = 2 * Math.PI * 96

// Cast-iron grate bars across the ring, like a kettle grill seen from above
const BARS = Array.from({ length: 10 }, (_, index) => 14 + index * 20)

// Sparks that lift off the coals and escape through the top of the ring.
// x and drift are in logo units, delay is negative so they are already mid-flight on first paint.
const SPARKS = [
  { x: 58, drift: -9, size: 1.3, dur: 3.6, delay: 0.4 },
  { x: 76, drift: 6, size: 1.7, dur: 4.4, delay: 1.9 },
  { x: 92, drift: -4, size: 1.1, dur: 3.2, delay: 2.7 },
  { x: 108, drift: 10, size: 1.5, dur: 4.8, delay: 0.9 },
  { x: 124, drift: -7, size: 1.2, dur: 3.9, delay: 3.3 },
  { x: 142, drift: 8, size: 1.6, dur: 4.2, delay: 1.4 },
]

function Wordmark({ fill, ...rest }) {
  return (
    <g fill={fill} fontFamily="Inter, Arial, sans-serif" fontSize="28" fontWeight="600" textAnchor="middle" {...rest}>
      <text x="100" y="96" textLength="112" lengthAdjust="spacing">
        SMOKY
      </text>
      <text x="100" y="128" textLength="112" lengthAdjust="spacing">
        BROS
      </text>
    </g>
  )
}

// With `alive`, the mark is a working grill: coals pulse under the grate, sparks lift off,
// the lines shimmer in the heat, an ember travels round the ring, and the letters catch
// a flickering glow from underneath.
export default function Logo({ className = 'h-28 w-28', alive = false }) {
  const uid = useId().replace(/:/g, '')
  const heat = `heat-${uid}`
  const bloom = `bloom-${uid}`
  const coals = `coals-${uid}`
  const bowl = `bowl-${uid}`

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Smoky Bros"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      {alive && (
        <defs>
          <filter id={heat} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.014" numOctaves="2" seed="4" result="noise">
              <animate
                attributeName="baseFrequency"
                dur="9s"
                values="0.006 0.014;0.01 0.022;0.006 0.014"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={bloom} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
          <radialGradient id={coals} cx="50%" cy="78%" r="62%">
            <stop offset="0" stopColor="#FF4D1C" stopOpacity="1" />
            <stop offset="0.5" stopColor="#E0420F" stopOpacity="0.7" />
            <stop offset="1" stopColor="#C8360A" stopOpacity="0" />
          </radialGradient>
          <clipPath id={bowl}>
            <circle cx="100" cy="100" r="94" />
          </clipPath>
        </defs>
      )}

      {alive && (
        <>
          {/* Coals: a bed of heat that breathes and flickers, lighting the gaps between the bars */}
          <g clipPath={`url(#${bowl})`}>
            <circle cx="100" cy="100" r="94" fill={`url(#${coals})`} opacity="0.7">
              <animate attributeName="opacity" values="0.45;0.85;0.55;0.95;0.5;0.8;0.45" dur="4.3s" repeatCount="indefinite" />
            </circle>
            {/* The grate, dark against the glow, with a thin highlight on each bar */}
            {BARS.map((y) => (
              <g key={y}>
                <line x1="0" x2="200" y1={y} y2={y} stroke="#050505" strokeWidth="6" />
                <line x1="0" x2="200" y1={y - 2.6} y2={y - 2.6} stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="0.8" />
              </g>
            ))}
            <line x1="100" x2="100" y1="0" y2="200" stroke="#050505" strokeWidth="3" />
          </g>

          {/* Sparks lift off the coals and slip out over the top of the ring */}
          {SPARKS.map((spark) => (
            <circle key={spark.x} cx={spark.x} cy="160" r={spark.size} fill="#FFB070">
              <animate attributeName="cy" values="165;-26" dur={`${spark.dur}s`} begin={`-${spark.delay}s`} repeatCount="indefinite" />
              <animate
                attributeName="cx"
                values={`${spark.x};${spark.x + spark.drift}`}
                dur={`${spark.dur}s`}
                begin={`-${spark.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;0.9;0"
                keyTimes="0;0.2;0.7;1"
                dur={`${spark.dur}s`}
                begin={`-${spark.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </>
      )}

      <g filter={alive ? `url(#${heat})` : undefined}>
        <circle cx="100" cy="100" r="96" fill="none" stroke={WHITE} strokeWidth="3" />
        {/* The box is solid when alive, so the grate shows only above and below it, like a lid plate */}
        <rect
          x="34"
          y="58"
          width="132"
          height="84"
          fill={alive ? 'rgba(5, 5, 5, 0.86)' : 'none'}
          stroke={WHITE}
          strokeWidth="2.4"
        />
      </g>

      {alive && (
        <>
          {/* The ember, with a faint comet tail, circling the ring */}
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="7s" repeatCount="indefinite" />
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke="#FF4D1C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`70 ${CIRCUMFERENCE}`}
              opacity="0.35"
              transform="rotate(-42 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke="#FF4D1C"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`16 ${CIRCUMFERENCE}`}
              filter={`url(#${bloom})`}
            />
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke="#FFD2B0"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeDasharray={`10 ${CIRCUMFERENCE}`}
            />
          </g>

          {/* Firelight under the letters, flickering out of step with the coals */}
          <g filter={`url(#${bloom})`} opacity="0.4">
            <animate attributeName="opacity" values="0.15;0.55;0.28;0.62;0.2;0.5;0.15" dur="3.9s" repeatCount="indefinite" />
            <Wordmark fill="#FF4D1C" />
          </g>
        </>
      )}

      <Wordmark fill="#F7F7F7" />
    </svg>
  )
}
