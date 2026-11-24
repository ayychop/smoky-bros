import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE_OUT_EXPO } from '../easing'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(
    () => window.matchMedia('(pointer: fine)').matches,
  )
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 380, damping: 28, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 380, damping: 28, mass: 0.35 })

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }

    const onOver = (event) => {
      const target = event.target instanceof Element ? event.target.closest('a, button') : null
      setHovering(Boolean(target))
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] h-3 w-3 rounded-full bg-emberGlow mix-blend-screen"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        scale: hovering ? 40 / 12 : 1,
        opacity: visible ? (hovering ? 0.55 : 1) : 0,
      }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    />
  )
}
