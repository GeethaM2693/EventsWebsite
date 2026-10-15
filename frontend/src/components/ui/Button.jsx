import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-deep hover:text-white',
  outline: 'border-[1.5px] border-primary text-primary hover:bg-primary-soft',
  ghost: 'border border-line bg-surface text-primary hover:bg-primary-soft',
}

export default function Button({ to, variant = 'primary', className = '', children, ...rest }) {
  const cls = `inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-[18px] text-[15px] font-bold no-underline transition-colors cursor-pointer ${variants[variant]} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  return <button className={cls} {...rest}>{children}</button>
}
