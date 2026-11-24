import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TITLES = {
  '/': 'Made in Smoke | Smoky Bros, Premium BBQ Catering in Maidenhead',
  '/services': 'Services | Smoky Bros',
  '/book': 'Book an Event | Smoky Bros',
  '/enquiry': 'Enquiries | Smoky Bros',
}

// Resets scroll on every route change, and lands on #anchors when the URL has one.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Not found | Smoky Bros'
  }, [pathname])

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return undefined
    }

    // Wait a beat so the incoming page has mounted before we look for the anchor
    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash.slice(1))
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 450)

    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}
