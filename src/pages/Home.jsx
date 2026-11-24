import BookingCTA from '../components/BookingCTA'
import Hero from '../components/Hero'
import OriginStory from '../components/OriginStory'
import PremiumMenu from '../components/PremiumMenu'
import QuickActions from '../components/QuickActions'
import TestimonialMarquee from '../components/TestimonialMarquee'

export default function Home() {
  return (
    <>
      <Hero />
      <QuickActions />
      <PremiumMenu />
      <OriginStory />
      <TestimonialMarquee />
      <BookingCTA />
    </>
  )
}
