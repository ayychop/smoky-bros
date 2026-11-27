import BookingCTA from '../components/BookingCTA'
import FAQ from '../components/FAQ'
import PageHeader from '../components/PageHeader'
import ProcessSteps from '../components/ProcessSteps'
import ServiceRow from '../components/ServiceRow'
import { SERVICES } from '../data/site'

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        hint="Not sure which fits? Just ask"
        title="Built around the fire"
        copy="Private catering, street food and partnerships. Cooked over live fire in Maidenhead and across Berkshire."
      />
      <div className="paper space-y-20 pb-20 pt-12 md:space-y-28 md:pt-16">
        {SERVICES.map((service, index) => (
          <ServiceRow key={service.id} service={service} flip={index % 2 === 1} />
        ))}
      </div>
      <ProcessSteps />
      <FAQ />
      <BookingCTA title="Ready when you are" />
    </>
  )
}
