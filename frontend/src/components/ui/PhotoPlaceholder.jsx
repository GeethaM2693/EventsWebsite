const tones = {
  olive: 'bg-primary',
  deep: 'bg-primary-deep',
  soft: 'bg-primary-soft',
  warm: 'bg-accent-soft',
  accent: 'bg-accent',
}

// Stand-in for event photos. Swap the inner content for an <img> when real images exist.
export default function PhotoPlaceholder({ tone = 'soft', label, className = '', children }) {
  return (
    <div className={`relative ${tones[tone]} ${className}`}>
      {label && (
        <span className="absolute bottom-3 left-3 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
          Photo · {label}
        </span>
      )}
      {children}
    </div>
  )
}
