// Procedural smoke with no libraries. Each plume is a soft noise puff that rises from the fire,
// swells, drifts sideways and dissolves, on its own clock. Thresholded noise leaves clear gaps inside
// each puff so it reads as smoke and not as a flat grey veil, and a radial mask on every plume
// removes its edges, so there are no tiles, seams or boxes anywhere.

function puff(seed, frequency) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='768' height='768'>` +
    `<filter id='s' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='${frequency}' numOctaves='5' seed='${seed}'/>` +
    `<feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.92  0 0 0 0 0.88  3.4 0 0 0 -1.35'/>` +
    `</filter><rect width='100%' height='100%' filter='url(#s)'/></svg>`
  const encoded = svg.replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E')
  return `url("data:image/svg+xml,${encoded}")`
}

const TEXTURES = [puff(3, '0.006 0.011'), puff(11, '0.008 0.014'), puff(27, '0.005 0.01')]

const SOFT_EDGE = 'radial-gradient(closest-side, #000 22%, transparent 100%)'

// left: where it starts (%), size: px, dx: sideways drift, rot: twist, peak: strongest opacity
const PLUMES = [
  { left: 50, size: 700, duration: 17, delay: 0, dx: '6%', rot: '14deg', peak: 0.5, texture: 0 },
  { left: 28, size: 560, duration: 21, delay: 3.5, dx: '-12%', rot: '-18deg', peak: 0.42, texture: 1 },
  { left: 72, size: 620, duration: 19, delay: 7, dx: '14%', rot: '20deg', peak: 0.44, texture: 2 },
  { left: 40, size: 760, duration: 24, delay: 10.5, dx: '-6%', rot: '-10deg', peak: 0.4, texture: 0 },
  { left: 62, size: 520, duration: 15, delay: 13, dx: '10%', rot: '24deg', peak: 0.36, texture: 1 },
  { left: 16, size: 600, duration: 23, delay: 17, dx: '8%', rot: '12deg', peak: 0.34, texture: 2 },
  { left: 84, size: 580, duration: 20, delay: 20, dx: '-10%', rot: '-22deg', peak: 0.34, texture: 0 },
  { left: 52, size: 480, duration: 14, delay: 23, dx: '-4%', rot: '16deg', peak: 0.3, texture: 1 },
]

// count: how many plumes to render. scale: shrinks them for small surfaces such as a card.
export default function Smoke({ className = '', strength = 1, count = PLUMES.length, scale = 1 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`} style={{ opacity: strength }}>
      {PLUMES.slice(0, count).map((plume, index) => (
        <div
          key={index}
          className="smoke-plume absolute"
          style={{
            left: `${plume.left}%`,
            bottom: '-14%',
            width: plume.size * scale,
            height: plume.size * scale,
            marginLeft: (-plume.size * scale) / 2,
            backgroundImage: TEXTURES[plume.texture],
            backgroundSize: '100% 100%',
            maskImage: SOFT_EDGE,
            WebkitMaskImage: SOFT_EDGE,
            animationDuration: `${plume.duration}s`,
            // Negative delay, so the sky is already full of smoke on first paint
            animationDelay: `-${plume.delay}s`,
            '--dx': plume.dx,
            '--rot': plume.rot,
            '--peak': plume.peak,
          }}
        />
      ))}
    </div>
  )
}
