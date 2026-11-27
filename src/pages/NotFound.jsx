import { Link } from 'react-router-dom'
import FlameBro from '../components/FlameBro'
import MagneticButton from '../components/MagneticButton'
import PageHeader from '../components/PageHeader'

export default function NotFound() {
  return (
    <>
      <PageHeader hint="Lost? Head back home" eyebrow="404" title="This one went up in smoke" copy="The page you wanted is not here. The fire is, though." />
      <div className="relative flex flex-col items-center bg-ink px-6 pb-24 pt-6">
        <FlameBro alive className="h-56 w-auto" />
        <div className="mt-10">
          <MagneticButton>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-chili px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-ember transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun"
            >
              Back home
            </Link>
          </MagneticButton>
        </div>
      </div>
    </>
  )
}
