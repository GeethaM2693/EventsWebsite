export default function Eyebrow({ children, className = '' }) {
  return (
    <div className={`text-[13px] font-bold uppercase tracking-[0.14em] text-primary ${className}`}>
      {children}
    </div>
  )
}
