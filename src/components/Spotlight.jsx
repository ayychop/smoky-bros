import { useMotionTemplate, useMotionValue, useSpring, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

// A soft warm light that follows the mouse across its parent. It writes to motion values only,
// so moving the pointer never re-renders React.
export default function Spotlight({ size = 520, tint = '255,255,255' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 })

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return undefined

    const center = () => {
      const bounds = parent.getBoundingClientRect()
      x.set(bounds.width / 2)
      y.set(bounds.height * 0.42)
      sx.jump(bounds.width / 2)
      sy.jump(bounds.height * 0.42)
    }
    center()

    const onMove = (event) => {
      const bounds = parent.getBoundingClientRect()
      x.set(event.clientX - bounds.left)
      y.set(event.clientY - bounds.top)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', center)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', center)
    }
  }, [x, y, sx, sy])

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${sx}px ${sy}px, rgba(${tint},0.42) 0%, rgba(${tint},0.12) 40%, transparent 70%)`

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] mix-blend-soft-light"
      style={{ background }}
    />
  )
}
