import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { SavedProvider } from '../context/SavedContext'

export default function App() {
  return (
    <BrowserRouter>
      <SavedProvider>
        <AppRoutes />
      </SavedProvider>
    </BrowserRouter>
  )
}
