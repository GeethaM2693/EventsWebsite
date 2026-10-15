const base = 'flex min-h-12 cursor-pointer items-center gap-1.5 border-0 border-b-2 bg-transparent px-0.5 text-[15px] -mb-px'

// Underlined tab strip. `extra` is rendered after the tabs (e.g. a "Custom Dates" link).
// role="tablist" → real tabs (aria-selected); otherwise a pressed-button group.
export default function UnderlineTabs({ items, value, onChange, label, role, extra, className = '' }) {
  const isTabs = role === 'tablist'
  return (
    <div role={isTabs ? 'tablist' : 'group'} aria-label={label} className={`flex flex-wrap gap-x-7 gap-y-1 ${className}`}>
      {items.map((item) => {
        const { id = item, label: text = item } = typeof item === 'string' ? {} : item
        const on = id === value
        return (
          <button
            key={id}
            type="button"
            role={isTabs ? 'tab' : undefined}
            aria-selected={isTabs ? on : undefined}
            aria-pressed={isTabs ? undefined : on}
            onClick={() => onChange(id)}
            className={`${base} ${on ? 'border-primary font-bold text-primary' : 'border-transparent font-semibold text-muted hover:text-primary'}`}
          >
            {text}
          </button>
        )
      })}
      {extra}
    </div>
  )
}

export const tabExtraClass = `${base} border-transparent font-semibold text-muted no-underline hover:text-primary`
