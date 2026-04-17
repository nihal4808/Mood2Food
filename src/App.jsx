import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DocsPage, GetKeyPage, LandingPage, NotFoundPage } from './pages'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/get-key" element={<GetKeyPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
