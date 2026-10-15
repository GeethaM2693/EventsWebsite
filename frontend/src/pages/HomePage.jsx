import { Link } from 'react-router-dom'
import Hero from '../features/home/Hero'
import FeaturedEvent from '../features/home/FeaturedEvent'
import CategoryGrid from '../features/home/CategoryGrid'
import NearbyMap from '../features/home/NearbyMap'
import MonthAgenda from '../features/home/MonthAgenda'
import HiddenGems from '../features/home/HiddenGems'
import OrganizerCTA from '../features/home/OrganizerCTA'
import EventSection from '../components/events/EventSection'
import EventCard from '../components/events/EventCard'
import EventCardCompact from '../components/events/EventCardCompact'
import EventCardEditorial from '../components/events/EventCardEditorial'
import EventRow from '../components/events/EventRow'
import Section from '../components/ui/Section'
import SectionLink from '../components/ui/SectionLink'
import LoadState from '../components/ui/LoadState'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'
import { SAMPLE_DATE_LABEL } from '../data/site'

const collection = (slug) => `/collections/${slug}`

export default function HomePage() {
  const home = useFetch((signal) => api.get('/home', { signal }), [])

  return (
    <>
      <Hero />
      <LoadState state={home} className="min-h-[40vh]">
        {({ data }) => <HomeSections data={data} />}
      </LoadState>
      <OrganizerCTA />
    </>
  )
}

// Sections that depend on the /home response, in page order. Empty sections are skipped.
function HomeSections({ data }) {
  const { featured, today, trending, weekend, exhibitions, markets, family, business, month, places } = data
  return (
    <>
      {today.length > 0 && (
        <EventSection
          id="today" lead="Happening" emphasis="today" className="pt-4" gap="mt-7"
          action={
            <span className="text-[15px] font-semibold text-muted">
              {SAMPLE_DATE_LABEL} · <Link to="/explore" className="font-bold">Everything on today</Link>
            </span>
          }
        >
          {today.map((e) => <EventCard key={e.id} event={e} />)}
        </EventSection>
      )}

      {featured && <FeaturedEvent event={featured} />}

      <CategoryGrid />

      {trending.length > 0 && (
        <EventSection
          id="trending" lead="Trending" emphasis="in Hyderabad" layout="editorial"
          action={<SectionLink to={collection('trending')}>View all trending</SectionLink>}
        >
          {trending.map((e) => <EventCardEditorial key={e.id} event={e} saveable />)}
        </EventSection>
      )}

      {weekend.length > 0 && (
        <EventSection
          id="weekend" lead="Popular" emphasis="this weekend" layout="wide"
          action={<SectionLink to={collection('weekend')}>Plan your weekend</SectionLink>}
        >
          {weekend.map((e) => <EventCardEditorial key={e.id} event={e} size="lg" />)}
        </EventSection>
      )}

      {exhibitions.length > 0 && (
        <EventSection
          id="expo" lead="Exhibitions" emphasis="& trade fairs" layout="compact"
          action={<SectionLink to={collection('exhibitions')}>All exhibitions</SectionLink>}
        >
          {exhibitions.map((e) => <EventCardCompact key={e.id} event={e} />)}
        </EventSection>
      )}

      {markets.length > 0 && (
        <EventSection
          id="food" lead="Food festivals," emphasis="flea markets & shopping" layout="compact"
          action={<SectionLink to={collection('markets')}>All markets</SectionLink>}
        >
          {markets.map((e) => <EventCardCompact key={e.id} event={e} />)}
        </EventSection>
      )}

      {family.length > 0 && (
        <EventSection
          id="family" lead="Family activities" emphasis="& entertainment" layout="compact"
          action={<SectionLink to={collection('family')}>All family picks</SectionLink>}
        >
          {family.map((e) => <EventCardCompact key={e.id} event={e} />)}
        </EventSection>
      )}

      {business.length > 0 && (
        <Section
          id="biz" lead="Business events" emphasis="& networking"
          action={<SectionLink to={collection('business')}>All business events</SectionLink>}
        >
          <div className="mt-7 border-t border-line">
            {business.map((e) => <EventRow key={e.id} event={e} />)}
          </div>
        </Section>
      )}

      <NearbyMap />
      {month.length > 0 && <MonthAgenda days={month} />}
      {places.length > 0 && <HiddenGems places={places} />}
    </>
  )
}
