import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/ui/SearchBar'

export default function HeroSearch() {
  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')?.toString().trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }
  return <SearchBar id="hero-search" onSubmit={onSubmit} className="mx-auto mt-11" />
}
