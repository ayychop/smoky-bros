import { animate, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { EASE_OUT_EXPO } from '../easing'

// Pulls toward the pointer when it gets close, and presses in when tapped
export default function MagneticButton({ children, className = '' }) {
  const ref = useRef(null)
  const engaged = useRef(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.2 })

  useEffect(() => {
    const release = () => {
      animate(x, 0, { duration: 0.55, ease: EASE_OUT_EXPO })
      animate(y, 0, { duration: 0.55, ease: EASE_OUT_EXPO })
    }

    const onMove = (event) => {
      const node = ref.current
      if (!node) return
      const bounds = node.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      const deltaX = event.clientX - centerX
      const deltaY = event.clientY - centerY
      const distance = Math.hypot(deltaX, deltaY)
      const reach = Math.max(bounds.width, bounds.height) * 0.9

      if (distance < reach) {
        engaged.current = true
        const strength = (1 - distance / reach) * Math.min(18, reach * 0.22)
        const angle = Math.atan2(deltaY, deltaX)
        x.set(Math.cos(angle) * strength)
        y.set(Math.sin(angle) * strength)
      } else if (engaged.current) {
        engaged.current = false
        release()
      }
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}
