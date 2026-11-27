import usePauseOffscreen from '../lib/usePauseOffscreen'
import { polar, STOPS, WHEEL_RADIUS } from '../lib/wheelGeometry'

// The wheel round the flame bro, drawn as a pitmaster's smoker dial. It has a job: it is the dial on the side of the
// smoker, set to 225, the temperature that low and slow is cooked at. Heat climbs the gauge toward the top, an ember
// travels the rim, and the flame passes its heat out to the four things on the wheel along dotted spokes.
//
// Everything lives in one square, 100 units a side, so the geometry is exact at every size.
// An angle is in degrees clockwise from the top. The wheel's centre is (50, 50).

// The gauge runs from the lower left, up over the top and down to the lower right. The gap at the bottom is for the nameplate.
const GAUGE_FROM = 225
const GAUGE_TO = 135

const f = (n) => Math.round(n * 100) / 100
const at = (degrees, radius) => {
  const { x, y } = polar(degrees, radius)
  return `${f(x)} ${f(y)}`
}

// Tick marks round the outside of the gauge: a fine one every 5 degrees, a long gold one every 45
const TICKS = []
for (let degrees = 0; degrees < 360; degrees += 5) {
  const inGap = degrees > GAUGE_TO && degrees < GAUGE_FROM
  if (inGap) continue
  const major = degrees % 45 === 0
  TICKS.push({ degrees, major, length: major ? 2.4 : 1.1 })
}

// Heat passes from the flame out along each spoke, one after another, round the wheel
const HEAT_ORDER = ['brisket', 'seal', 'wings', 'ribs']

export default function FireWheel() {
  const paused = usePauseOffscreen()

  return (
    <div ref={paused} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" shapeRendering="geometricPrecision">
        <defs>
          {/* Heat rises: ember at the bottom of the gauge, fire gold at the top */}
          <linearGradient id="wheelHeat" gradientUnits="userSpaceOnUse" x1="50" y1="94" x2="50" y2="6">
            <stop offset="0" stopColor="#C8360A" />
            <stop offset="0.55" stopColor="#E0450F" />
            <stop offset="1" stopColor="#FFB703" />
          </linearGradient>
        </defs>

        {/* The rim, a fine line all the way round */}
        <circle cx="50" cy="50" r={WHEEL_RADIUS} stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="0.3" />

        {/* The gauge itself: the heat arc */}
        <path d={`M${at(GAUGE_FROM, WHEEL_RADIUS)} A${WHEEL_RADIUS} ${WHEEL_RADIUS} 0 1 1 ${at(GAUGE_TO, WHEEL_RADIUS)}`} stroke="url(#wheelHeat)" strokeWidth="0.7" strokeLinecap="round" />

        {/* The scale */}
        {TICKS.map(({ degrees, major, length }) => (
          <path
            key={degrees}
            d={`M${at(degrees, WHEEL_RADIUS + 1.7)} L${at(degrees, WHEEL_RADIUS + 1.7 + length)}`}
            stroke={major ? '#FFB703' : '#FFFFFF'}
            strokeOpacity={major ? 0.85 : 0.28}
            strokeWidth={major ? 0.5 : 0.3}
            strokeLinecap="round"
          />
        ))}

        {/* The spokes: the flame passing its heat out to each of the four. A dotted trail, like sparks. */}
        {Object.values(STOPS).map((degrees) => (
          <path
            key={degrees}
            d={`M${at(degrees, 19.5)} L${at(degrees, 28.5)}`}
            stroke="#FFB703"
            strokeOpacity="0.7"
            strokeWidth="0.9"
            strokeDasharray="0.01 1.9"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* An ember that travels the rim, with a short tail of light behind it */}
      <div
        className="absolute inset-[6%] animate-[spin_16s_linear_infinite] rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, transparent 262deg, rgba(255,150,40,0.35) 322deg, rgba(255,226,170,0.98) 357deg, transparent 360deg)',
          WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 2.6px), #000 calc(100% - 1.2px), #000 calc(100% - 0.2px), transparent 100%)',
          mask: 'radial-gradient(closest-side, transparent calc(100% - 2.6px), #000 calc(100% - 1.2px), #000 calc(100% - 0.2px), transparent 100%)',
        }}
      />

      {/* The beads where each spoke meets its card. They glow in turn, so the heat seems to travel round the wheel. */}
      {HEAT_ORDER.map((name, index) => {
        const { x, y } = polar(STOPS[name], 28.5)
        return (
          <span
            key={name}
            className="wheel-bead absolute block h-[2.1%] w-[2.1%] rounded-full bg-gold"
            style={{ left: `${x}%`, top: `${y}%`, marginLeft: '-1.05%', marginTop: '-1.05%', animationDelay: `${index * 1.1}s` }}
          />
        )
      })}

      {/* The nameplate in the gap at the bottom of the gauge */}
      <div className="absolute inset-x-0 -mt-[0.8rem] flex justify-center" style={{ top: '94%' }}>
        <span className="font-cond flex items-center gap-2 rounded-full border border-gold/45 bg-ink px-3 py-1.5 text-[0.56rem] leading-none tracking-[0.26em] text-gold sm:gap-2.5 sm:px-4 sm:text-[0.66rem]">
          <span className="text-white">225&deg;F</span>
          <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
          <span className="pl-[0.26em]">Low &amp; Slow</span>
        </span>
      </div>
    </div>
  )
}
