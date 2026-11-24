import { motion } from 'framer-motion'
import { Briefcase, Flame, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EASE_OUT_EXPO } from '../easing'

const MotionLink = motion.create(Link)

const ACTIONS = [
  { label: 'Private Catering', note: 'Weddings, birthdays and garden parties', to: '/services#private-catering', Icon: Users },
  { label: 'Corporate Events', note: 'Team days, launches and client dinners', to: '/book', Icon: Briefcase },
  { label: 'Street Food', note: 'The van, live fire, wherever you are', to: '/services#street-food', Icon: Flame },
]

export default function QuickActions() {
  return (
    <section
      aria-label="Quick actions"
      className="relative z-20 mx-auto -mt-10 grid max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-3"
    >
      {ACTIONS.map(({ label, note, to, Icon }, index) => (
        <MotionLink
          key={label}
          to={to}
          className="group flex cursor-pointer flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition-all hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: index * 0.1, ease: EASE_OUT_EXPO }}
        >
          <Icon size={32} strokeWidth={1.6} aria-hidden="true" className="text-ember transition-transform group-hover:scale-110" />
          <span className="mt-4 font-serif text-2xl text-white/90">{label}</span>
          <span className="mt-2 text-sm text-gray-400">{note}</span>
        </MotionLink>
      ))}
    </section>
  )
}
