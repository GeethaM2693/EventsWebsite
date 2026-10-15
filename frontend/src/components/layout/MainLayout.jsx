import { Outlet } from 'react-router-dom'
import SampleBanner from './SampleBanner'
import Header from './Header'
import Footer from './Footer'
import CompactFooter from './CompactFooter'

// header: 'full' | 'simple'.  footer: 'full' | 'compact' | 'organizer' | 'none'.
export default function MainLayout({ header = 'full', footer = 'compact' }) {
  return (
    <div className="min-h-screen">
      <SampleBanner />
      <Header variant={header} />
      <main>
        <Outlet />
      </main>
      {footer === 'full' && <Footer />}
      {footer === 'compact' && <CompactFooter />}
      {footer === 'organizer' && <CompactFooter variant="organizer" />}
    </div>
  )
}
