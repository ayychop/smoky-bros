import Lenis from 'lenis'
import { useEffect } from 'react'

// Shared handle so route changes and anchor links can drive the same smooth scroller.
// `wake` starts the frame loop again if it has gone to sleep.
export const lenisRef = { current: null, wake: () => {} }

export function scrollToTop() {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(0, { immediate: true, force: true })
    lenisRef.wake()
  } else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

export function scrollToTarget(target) {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { duration: 1.4, offset: -24 })
    lenisRef.wake()
  } else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Anything that can start a scroll wakes the loop
const WAKE_EVENTS = ['wheel', 'touchstart', 'touchmove', 'keydown', 'pointerdown', 'scroll']
// How long the loop stays awake after the last sign of scrolling
const STAY_AWAKE = 1200

// Buttery smooth scrolling, skipped for visitors who ask for reduced motion
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // The frame loop only runs while something is scrolling, then sleeps. A loop that runs forever keeps the whole
    // page waking up 60 times a second to do nothing, which costs battery and steals time from the animations.
    let frame = 0
    let lastActivity = performance.now()

    const loop = (time) => {
      lenis.raf(time)
      if (lenis.isScrolling || performance.now() - lastActivity < STAY_AWAKE) frame = requestAnimationFrame(loop)
      else frame = 0
    }

    const wake = () => {
      lastActivity = performance.now()
      if (!frame) frame = requestAnimationFrame(loop)
    }

    lenisRef.wake = wake
    WAKE_EVENTS.forEach((name) => window.addEventListener(name, wake, { passive: true }))
    const stopListening = lenis.on('scroll', wake)
    wake()

    return () => {
      cancelAnimationFrame(frame)
      WAKE_EVENTS.forEach((name) => window.removeEventListener(name, wake))
      stopListening?.()
      lenis.destroy()
      lenisRef.current = null
      lenisRef.wake = () => {}
    }
  }, [])
}
