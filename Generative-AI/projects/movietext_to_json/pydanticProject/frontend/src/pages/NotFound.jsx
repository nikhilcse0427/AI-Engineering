import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#151A23] px-6 text-center text-[#F7F8F9]">
      <p className="text-sm font-semibold text-[#579DFF]">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-[#8C9BAB]">That page doesn’t exist.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/">
          <Button variant="secondary">Home</Button>
        </Link>
        <Link to="/workspace">
          <Button>Start</Button>
        </Link>
      </div>
    </div>
  )
}
