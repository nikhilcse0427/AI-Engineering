import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing'
import Extract from './pages/Extract'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/workspace" element={<AppLayout />}>
        <Route index element={<Extract />} />
      </Route>
      <Route path="/app" element={<Navigate to="/workspace" replace />} />
      <Route path="/app/*" element={<Navigate to="/workspace" replace />} />
      <Route path="/extract" element={<Navigate to="/workspace" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
