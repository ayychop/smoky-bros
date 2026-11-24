import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '../easing'

export default function PageTransition({ children }) {
  return (
    <motion.main
      className="relative z-10 overflow-x-clip"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.main>
  )
}
