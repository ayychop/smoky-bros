import { motion } from 'framer-motion'

function unit(index, salt) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return value - Math.floor(value)
}

// Slow wisps that drift upward. Deterministic so renders stay pure.
const WISPS = Array.from({ length: 5 }, (_, index) => ({
  left: `${8 + unit(index, 5) * 70}%`,
  size: 180 + Math.round(unit(index, 6) * 160),
  duration: 14 + unit(index, 7) * 10,
  delay: -unit(index, 8) * 14,
}))

const COALS = Array.from({ length: 7 }, (_, index) => ({
  left: `${10 + unit(index, 9) * 80}%`,
  delay: `-${(unit(index, 10) * 9).toFixed(2)}s`,
  duration: `${(6 + unit(index, 11) * 6).toFixed(2)}s`,
}))

// A moody smoke-and-grill panel built from layered CSS. Pass imageSrc to swap in real photography.
export default function PlaceholderScene({ imageSrc, alt = '', caption, className = '' }) {
  return (
    <div className={`relative isolate overflow-hidden bg-[#070605] ${className}`}>
      {imageSrc ? (
        <img src={imageSrc} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          {/* Heat under the grate */}
          <div className="absolute inset-x-0 bottom-0 h-[85%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,96,40,0.85)_0%,rgba(200,54,10,0.45)_30%,rgba(200,54,10,0.12)_55%,transparent_75%)]" />

          {/* Drifting smoke, kept cool and faint so it never reads as mud */}
          {WISPS.map((wisp, index) => (
            <motion.span
              key={index}
              className="absolute bottom-[-10%] rounded-full bg-white/[0.1] blur-[60px]"
              style={{ left: wisp.left, width: wisp.size, height: wisp.size }}
              animate={{ y: [0, -520], opacity: [0, 0.9, 0], scale: [0.8, 1.5] }}
              transition={{ duration: wisp.duration, delay: wisp.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {/* Grill bars */}
          <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.92)_0_14px,transparent_14px_46px)] [mask-image:linear-gradient(to_top,black_30%,transparent)] [-webkit-mask-image:linear-gradient(to_top,black_30%,transparent)]" />
          <div className="absolute inset-x-0 bottom-[8%] h-px bg-gradient-to-r from-transparent via-emberGlow/60 to-transparent" />

          {/* Rising coals */}
          {COALS.map((coal, index) => (
            <span
              key={index}
              className="ember-float absolute bottom-[6%] h-1 w-1 rounded-full bg-emberGlow blur-[0.5px] shadow-[0_0_8px_2px_rgba(255,77,28,0.7)]"
              style={{ left: coal.left, animationDelay: coal.delay, animationDuration: coal.duration }}
            />
          ))}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40" />
      {caption && (
        <p className="absolute bottom-5 left-6 text-[10px] uppercase tracking-[0.34em] text-ash/40">{caption}</p>
      )}
    </div>
  )
}
