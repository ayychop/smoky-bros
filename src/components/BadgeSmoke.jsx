// The aura around the badge. Restrained on purpose: it should feel like warm light, never like an effect.
//  1. A wide, soft glow that breathes slowly, as if the coals inside were lighting the air.
//  2. A hairline of light round the rim with one highlight gliding along it, like a gleam on polished metal.
//
// Place it as a sibling behind the badge, inside a `relative isolate` box the same size as the badge.
export default function BadgeSmoke({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      {/* The glow: wide and soft, with no edge you can point to */}
      <div
        className="absolute -inset-[30%] animate-[auraBreath_7s_ease-in-out_infinite] rounded-full"
        style={{ background: 'radial-gradient(closest-side, transparent 55%, rgba(255,122,40,0.3) 61%, rgba(217,43,11,0.12) 76%, transparent)' }}
      />

      {/* The hairline and its gleam */}
      <div className="absolute -inset-[1.6%] rounded-full border border-sun/25" />
      <div
        className="absolute -inset-[1.6%] animate-[spin_14s_linear_infinite] rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, transparent 62%, rgba(255,214,170,0.95) 74%, transparent 84%, transparent)',
          WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
          mask: 'radial-gradient(closest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
        }}
      />
    </div>
  )
}
