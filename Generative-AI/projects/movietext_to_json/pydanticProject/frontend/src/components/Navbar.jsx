import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#151A23]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8 sm:h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#388BFF] text-sm font-bold text-white">
            R
          </span>
          <div>
            <p className="text-base font-bold leading-none tracking-tight text-[#F7F8F9]">
              ReelSchema
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-[#8C9BAB]">Workspace</p>
          </div>
        </Link>

        <Link
          to="/"
          className="ml-auto rounded-md px-3 py-2 text-sm font-medium text-[#B3B9C4] transition hover:bg-white/5 hover:text-[#F7F8F9]"
        >
          Home
        </Link>
      </div>
    </header>
  )
}
