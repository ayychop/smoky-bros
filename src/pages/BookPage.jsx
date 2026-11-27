import BookingWizard from '../components/booking/BookingWizard'
import PageHeader from '../components/PageHeader'

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bookings open for 2027"
        hint="Start with the type of event"
        title="Book your fire"
        copy="Four quick steps. Tell us about the event and we will build the menu around it."
      />
      <div className="paper pb-20 pt-10">
        <BookingWizard />
      </div>
    </>
  )
}
