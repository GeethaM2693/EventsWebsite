// Filter chip. shape="pill" → round, solid when active. shape="soft" → 12px radius, soft fill when active.
const shapes = {
  pill: {
    base: 'min-h-11 rounded-full px-4 text-sm font-bold',
    on: 'border border-primary bg-primary text-white',
  },
  facet: {
    base: 'min-h-10 rounded-full px-3.5 text-sm font-bold',
    on: 'border border-primary bg-primary text-white',
  },
  soft: {
    base: 'min-h-10 rounded-control px-3.5 text-sm font-semibold',
    on: 'border-[1.5px] border-primary bg-primary-soft text-primary-deep',
  },
}

export default function Chip({ active = false, shape = 'pill', className = '', children, ...rest }) {
  const s = shapes[shape]
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`cursor-pointer whitespace-nowrap ${s.base} ${active ? s.on : 'border border-line bg-surface text-ink hover:bg-primary-soft'} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
