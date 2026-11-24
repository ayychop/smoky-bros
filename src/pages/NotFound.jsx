import { Link } from 'react-router-dom'
import MagneticButton from '../components/MagneticButton'
import PageHeader from '../components/PageHeader'

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="This one went up in smoke" copy="The page you wanted is not here. The fire is, though." />
      <div className="flex justify-center px-6 pb-8">
        <MagneticButton>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ember px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(200,54,10,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
          >
            Back home
          </Link>
        </MagneticButton>
      </div>
    </>
  )
}
