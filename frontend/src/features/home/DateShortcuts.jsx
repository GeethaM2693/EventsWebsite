import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import UnderlineTabs, { tabExtraClass } from '../../components/ui/UnderlineTabs'
import { dateShortcuts } from '../../data/filters'

export default function DateShortcuts() {
  const [active, setActive] = useState('Today')
  return (
    <nav aria-label="Date shortcuts" className="mt-7">
      <UnderlineTabs
        items={dateShortcuts}
        value={active}
        onChange={setActive}
        className="justify-center"
        extra={
          <Link to="/dates" className={tabExtraClass}>
            <Calendar size={16} aria-hidden="true" />
            Custom Dates
          </Link>
        }
      />
    </nav>
  )
}
