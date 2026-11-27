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
              className={`group relative flex items-start gap-4 rounded-2xl border border-ink p-5 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chili ${
 on
                  ? '-translate-y-0.5 bg-sun shadow-sticker'
                  : 'bg-white shadow-sticker hover:-translate-y-0.5 hover:bg-cream'
              }`}
            >
              {Icon && (
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink transition-colors duration-300 ${
 on ? 'bg-chili text-cream' : 'bg-cream text-ink'
                  }`}
                >
                  <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl text-ink">{option.label}</span>
                {option.blurb && <span className="mt-1 block text-sm font-medium leading-relaxed text-ink/75">{option.blurb}</span>}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
 on ? 'scale-100 border-ink bg-ink text-sun' : 'scale-90 border-ink/30 text-transparent'
                }`}
              >
                <Check size={13} strokeWidth={2.4} />
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
