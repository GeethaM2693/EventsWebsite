const sizes = {
  md: 'text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-0.03em]',
  lg: 'text-[clamp(38px,5.6vw,72px)] leading-[1.02] tracking-[-0.035em]',
}

// Page <h1>: light lead + bold olive emphasis.
export default function PageTitle({ lead, emphasis, size = 'md', className = '', id }) {
  return (
    <h1 id={id} className={`m-0 font-light ${sizes[size]} ${className}`}>
      {lead} <span className="font-bold text-primary">{emphasis}</span>
    </h1>
  )
}
