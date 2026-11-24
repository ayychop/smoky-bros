import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../easing'

// Scroll-triggered fade and rise. Transform and opacity only.
export default function Reveal({ children, className = '', delay = 0, x = 0, y = 32, amount = 0.25 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  )
}
