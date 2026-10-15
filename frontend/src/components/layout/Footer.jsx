import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import { BRAND, footerColumns } from '../../data/site'

function FooterColumn({ title, children }) {
  return (
    <nav aria-label={title} className="flex flex-[1_1_150px] flex-col gap-2.5 text-[15px]">
      <div className="mb-1 font-bold text-primary-deep">{title}</div>
      {children}
    </nav>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap gap-x-16 gap-y-10 pt-16 pb-10">
        <div className="flex-[2_1_260px]">
          <div className="text-xl font-bold text-primary-deep">{BRAND}</div>
          <p className="mt-3 max-w-80 text-[15px] leading-relaxed text-muted">
            A premium guide to what's happening around your city. Launching in Hyderabad.
          </p>
          <p className="mt-4 text-[15px] leading-[1.8]">
            hello@[yourdomain].com<br />[Phone number]
          </p>
        </div>

        {footerColumns.map((col) => (
          <FooterColumn key={col.title} title={col.title}>
            {col.links.map((label) => (
              <Link key={label} to="#" className="no-underline">{label}</Link>
            ))}
          </FooterColumn>
        ))}

        <FooterColumn title="Cities">
          <Link to="#" className="no-underline">Hyderabad</Link>
          <span className="text-muted">Bangalore · soon</span>
          <span className="text-muted">Mumbai · soon</span>
        </FooterColumn>
      </Container>

      <Container className="border-t border-line pt-5 pb-8 text-[13px] text-muted">
        Listings shown are sample data for design review, not verified events. © 2026 {BRAND}
      </Container>
    </footer>
  )
}
