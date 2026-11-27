import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import BootLoader from './components/BootLoader'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import ScrollManager from './components/ScrollManager'
import { useLenis } from './lib/lenis'
import Home from './pages/Home'

// Everything except the home page loads on demand, so the first paint stays light
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const BookPage = lazy(() => import('./pages/BookPage'))
const BrandBoard = lazy(() => import('./components/BrandBoard'))
const EnquiryPage = lazy(() => import('./pages/EnquiryPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Page({ children }) {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-[100svh]" />}>{children}</Suspense>
    </PageTransition>
  )
}

function AppShell() {
  const location = useLocation()
  // The brand deck is a full screen presentation, so it drops the site navigation and footer
  const isDeck = location.pathname === '/brand'
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <div className="film-grain" />
      <BootLoader />
      <ScrollManager />
      {!isDeck && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<Page><ServicesPage /></Page>} />
          <Route path="/book" element={<Page><BookPage /></Page>} />
          <Route path="/enquiry" element={<Page><EnquiryPage /></Page>} />
          <Route path="/brand" element={<Page><BrandBoard /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      {!isDeck && <Footer />}
    </MotionConfig>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
