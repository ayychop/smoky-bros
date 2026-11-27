import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// A soft warm light that follows the mouse across its parent.
// It is one small, fixed gradient that only ever moves (a transform), never a big gradient that is redrawn,
// and it uses no blend mode, so following the pointer costs the GPU almost nothing and never repaints the page.
// Phones and tablets have no pointer to follow, so they do not get one.
export default function Spotlight({ size = 520, tint = '255,236,214' }) {
  const ref = useRef(null)
  const [hasPointer] = useState(() => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (!hasPointer) return undefined
    const parent = ref.current?.parentElement
    if (!parent) return undefined

    const half = size / 2
    let bounds = parent.getBoundingClientRect()
    const measure = () => {
      bounds = parent.getBoundingClientRect()
    }

    const center = () => {
      measure()
      x.set(bounds.width / 2 - half)
      y.set(bounds.height * 0.42 - half)
      sx.jump(bounds.width / 2 - half)
      sy.jump(bounds.height * 0.42 - half)
    }
    center()

    // Only follow the pointer while it is over the section: the section is the only place the light can be seen
    const onMove = (event) => {
      if (event.clientY < bounds.top || event.clientY > bounds.bottom) return
      x.set(event.clientX - bounds.left - half)
      y.set(event.clientY - bounds.top - half)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', center)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', center)
    }
  }, [hasPointer, size, x, y, sx, sy])

  if (!hasPointer) return <span ref={ref} aria-hidden="true" className="hidden" />

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 will-change-transform"
        style={{
          x: sx,
          y: sy,
          width: size,
          height: size,
          background: `radial-gradient(closest-side, rgba(${tint},0.09) 0%, rgba(${tint},0.035) 45%, transparent 100%)`,
        }}
      />
    </div>
  )
}
