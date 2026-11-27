import { motion } from 'framer-motion'
import { cn } from '../lib/cn'

// An endless strip. Two identical halves make a -50% shift seamless, so the loop has no seam.
export default function Ticker({ children, duration = 45, reverse = false, className, label }) {
  const half = (hidden) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {children}
    </div>
  )

  return (
    <div aria-label={label} className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex w-max will-change-transform"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {half(false)}
        {half(true)}
      </motion.div>
    </div>
  )
}
