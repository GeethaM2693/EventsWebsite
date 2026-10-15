import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import HomePage from '../pages/HomePage'
import ExplorePage from '../pages/ExplorePage'
import EventDetailPage from '../pages/EventDetailPage'
import SavedPage from '../pages/SavedPage'
import ListEventPage from '../pages/ListEventPage'
import SearchPage from '../pages/SearchPage'
import DatePickerPage from '../pages/DatePickerPage'
import CollectionPage from '../pages/CollectionPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout footer="full" />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<MainLayout footer="compact" />}>
        <Route path="explore" element={<ExplorePage />} />
        <Route path="events/:id" element={<EventDetailPage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="dates" element={<DatePickerPage />} />
        <Route path="collections/:slug" element={<CollectionPage />} />
        <Route path="collections" element={<CollectionPage />} />
      </Route>

      <Route element={<MainLayout footer="organizer" />}>
        <Route path="list-event" element={<ListEventPage />} />
      </Route>

      <Route element={<MainLayout header="simple" footer="none" />}>
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  )
}
