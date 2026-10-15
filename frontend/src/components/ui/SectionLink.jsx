import { Link } from 'react-router-dom'

export default function SectionLink({ to = '#', children }) {
  return <Link to={to} className="text-[15px] font-bold">{children}</Link>
}
