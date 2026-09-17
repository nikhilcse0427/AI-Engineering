import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

export default function AppLayout() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#151A23] text-[#F7F8F9]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-20 top-[-10%] h-[50vh] w-[50vh] rounded-full bg-[#1E3A5F]/40" />
        <div className="absolute -bottom-24 left-[5%] h-[36vh] w-[36vh] rounded-full bg-[#1A3D36]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#151A23]/30 via-transparent to-[#0F131A]/70" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
