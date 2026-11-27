import BookingSection from '../components/BookingSection'
import BroCode from '../components/BroCode'
import CookStage from '../components/CookStage'
import Hero from '../components/Hero'
import OriginStory from '../components/OriginStory'
import PremiumMenu from '../components/PremiumMenu'
import QuickActions from '../components/QuickActions'
import TestimonialMarquee from '../components/TestimonialMarquee'

export default function Home() {
  return (
    <>
      <Hero />
      <CookStage />
      <QuickActions />
      <PremiumMenu />
      <OriginStory />
      <BroCode />
      <TestimonialMarquee />
      <BookingSection />
    </>
  )
}
