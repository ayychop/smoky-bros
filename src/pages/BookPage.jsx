import BookingWizard from '../components/booking/BookingWizard'
import PageHeader from '../components/PageHeader'

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bookings open for 2027"
        title="Book your fire"
        copy="Four quick steps. Tell us about the event and we will build the menu around it."
      />
      <BookingWizard />
    </>
  )
}
