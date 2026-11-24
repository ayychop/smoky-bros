import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import BootLoader from './components/BootLoader'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import ScrollManager from './components/ScrollManager'
import BookPage from './pages/BookPage'
import EnquiryPage from './pages/EnquiryPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ServicesPage from './pages/ServicesPage'

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      <div className="film-grain" />
      <BootLoader />
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/book" element={<PageTransition><BookPage /></PageTransition>} />
          <Route path="/enquiry" element={<PageTransition><EnquiryPage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}
