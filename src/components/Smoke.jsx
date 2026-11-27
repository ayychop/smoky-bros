// Smoke and embers drifting up behind a section, so the whole site feels like it sits over a live fire.
// Drop it in as the first child of a section that has `relative isolate overflow-hidden`.
// Positions are fixed numbers, so server and browser always draw the same thing.
const PLUMES = [
  { left: '2%', size: 26, delay: 0, dur: 19 },
  { left: '30%', size: 32, delay: -7, dur: 24 },
  { left: '58%', size: 24, delay: -13, dur: 21 },
  { left: '82%', size: 30, delay: -4, dur: 26 },
]

const EMBERS = [
  { left: '6%', size: 3, delay: 0, dur: 9, dx: '30px' },
  { left: '13%', size: 2, delay: -4, dur: 12, dx: '-24px' },
  { left: '21%', size: 4, delay: -7, dur: 10, dx: '40px' },
  { left: '33%', size: 2, delay: -2, dur: 13, dx: '-30px' },
  { left: '41%', size: 3, delay: -9, dur: 11, dx: '26px' },
  { left: '50%', size: 2, delay: -5, dur: 14, dx: '-36px' },
  { left: '58%', size: 4, delay: -1, dur: 10, dx: '34px' },
  { left: '67%', size: 2, delay: -8, dur: 12, dx: '-22px' },
  { left: '74%', size: 3, delay: -3, dur: 9, dx: '28px' },
  { left: '83%', size: 2, delay: -6, dur: 13, dx: '-34px' },
  { left: '90%', size: 4, delay: -10, dur: 11, dx: '24px' },
  { left: '96%', size: 2, delay: -2, dur: 10, dx: '-20px' },
]

/**
 * @param tone   "dark" for black sections (white smoke and embers), "light" for white sections (grey smoke)
 * @param plumes How many soft billows to draw, 0 to 4
 * @param embers How many glowing sparks to float up, 0 to 12. Dark sections get 8 unless told otherwise
 */
// eslint-disable-next-line no-unused-vars
export default function Smoke({ tone = 'dark', plumes = 3, embers, wisps, className = '' }) {
  const billow = tone === 'dark' ? 'rgba(255,255,255,0.09)' : 'rgba(20,16,14,0.06)'
  const sparks = embers ?? (tone === 'dark' ? 8 : 0)

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {PLUMES.slice(0, plumes).map((plume) => (
        <span
          key={plume.left}
          className="smoke-plume absolute bottom-0 block rounded-full"
          style={{
            left: plume.left,
            width: `${plume.size}rem`,
            height: `${plume.size}rem`,
            background: `radial-gradient(circle, ${billow} 0%, transparent 68%)`,
            animationDuration: `${plume.dur}s`,
            animationDelay: `${plume.delay}s`,
          }}
        />
      ))}
      {EMBERS.slice(0, sparks).map((ember) => (
        <span
          key={ember.left}
          className="ember-lane absolute bottom-0 block h-full w-0"
          style={{ left: ember.left, animationDuration: `${ember.dur}s`, animationDelay: `${ember.delay}s`, '--dx': ember.dx }}
        >
          <span
            className="absolute bottom-0 block rounded-full bg-sun"
            style={{ width: ember.size, height: ember.size, boxShadow: '0 0 8px 2px rgba(255,183,3,0.8)' }}
          />
        </span>
      ))}
    </div>
  )
}
