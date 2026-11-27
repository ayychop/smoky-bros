import { Check } from 'lucide-react'

// Accessible single or multi select built from buttons.
// multiple=false behaves as a radio group, multiple=true as a set of toggles.
export default function ChoiceGroup({ label, options, value, onChange, multiple = false, error, columns = 'sm:grid-cols-2' }) {
  const isOn = (id) => (multiple ? value.includes(id) : value === id)

  // Multi-select hands the parent an updater, so rapid taps never overwrite each other
  const toggle = (id) => {
    if (!multiple) return onChange(id)
    return onChange((current) => (current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]))
  }

  return (
    <fieldset>
      <legend className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-ink">{label}</legend>
      <div role={multiple ? 'group' : 'radiogroup'} className={`grid grid-cols-1 gap-3 ${columns}`}>
        {options.map((option) => {
          const on = isOn(option.id)
          const { Icon } = option
          return (
            <button
              key={option.id}
              type="button"
              role={multiple ? undefined : 'radio'}
              aria-checked={multiple ? undefined : on}
              aria-pressed={multiple ? on : undefined}
              onClick={() => toggle(option.id)}
              className={`group relative isolate flex items-start gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember ${
                on
                  ? '-translate-y-0.5 border-gold/80 bg-gradient-to-br from-[#3d170b] via-[#1d0f0a] to-ink shadow-[0_26px_50px_-24px_rgba(200,54,10,0.75)]'
                  : 'border-white/10 bg-gradient-to-br from-[#1c1512] to-ink shadow-sticker hover:-translate-y-0.5 hover:border-gold/45'
              }`}
            >
              {/* Ember light that rises from the bottom edge on hover and stays lit when chosen */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-[radial-gradient(75%_100%_at_50%_100%,rgba(200,54,10,0.5),transparent)] transition-opacity duration-500 ${
                  on ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                }`}
              />
              {/* A large, quiet echo of the icon in the corner */}
              {Icon && (
                <Icon
                  aria-hidden="true"
                  strokeWidth={1}
                  className={`pointer-events-none absolute -bottom-9 -right-7 -z-10 h-32 w-32 text-white transition-all duration-700 ${
                    on ? 'rotate-0 opacity-[0.09]' : '-rotate-6 opacity-[0.04] group-hover:rotate-0 group-hover:opacity-[0.07]'
                  }`}
                />
              )}
              {Icon && (
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    on
                      ? 'border-gold bg-gold text-ink shadow-[0_0_24px_rgba(255,183,3,0.45)]'
                      : 'border-gold/40 bg-gold/10 text-gold group-hover:border-gold/70 group-hover:bg-gold/15'
                  }`}
                >
                  <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                </span>
              )}
              <span className="min-w-0 flex-1 pt-0.5">
                <span className="block text-balance font-display text-xl leading-snug text-white">{option.label}</span>
                {option.blurb && (
                  <span className={`mt-1.5 block text-sm leading-relaxed transition-colors duration-500 ${on ? 'text-white/80' : 'text-white/60'}`}>
                    {option.blurb}
                  </span>
                )}
              </span>
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                  on ? 'scale-100 border-gold bg-gold text-ink' : 'scale-90 border-white/25 text-transparent group-hover:border-gold/60'
                }`}
              >
                <Check size={13} strokeWidth={2.6} />
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm font-bold text-chili">
          {error}
        </p>
      )}
    </fieldset>
  )
}
