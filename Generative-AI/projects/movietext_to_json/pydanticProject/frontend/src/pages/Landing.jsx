import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#151A23] text-[#F7F8F9]">
      {/* Soft Atlassian-style abstract shapes — muted for dark */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -right-20 top-[-10%] h-[55vh] w-[55vh] rounded-full bg-[#1E3A5F]/55"
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 right-[8%] h-[42vh] w-[42vh] rounded-full bg-[#1A3D36]/45"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[18%] right-[28%] h-[18vh] w-[18vh] rounded-full bg-[#3D3420]/40"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute left-[-8%] top-[40%] h-[28vh] w-[28vh] rounded-full bg-[#2B2550]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#151A23]/40 via-transparent to-[#0F131A]/80" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-6 sm:px-10 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex h-16 items-center justify-between sm:h-20"
        >
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#388BFF] text-sm font-bold text-white">
              R
            </span>
            <span className="text-lg font-bold tracking-tight text-[#F7F8F9]">
              ReelSchema
            </span>
          </Link>
          <Link
            to="/workspace"
            className="inline-flex h-10 items-center rounded-md bg-[#388BFF] px-4 text-sm font-semibold text-white transition hover:bg-[#579DFF]"
          >
            Start
          </Link>
        </motion.header>

        <div className="flex flex-1 flex-col justify-center pb-16 pt-4 lg:max-w-[58%]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-4 text-sm font-semibold text-[#579DFF]"
          >
            Movie data, structured
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-[clamp(2.4rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#F7F8F9]"
          >
            Turn free-form film notes into clean, validated JSON
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-[#B3B9C4] sm:text-xl"
          >
            Paste a messy movie description. Extract title, cast, genres, rating, and
            summary — ready for your workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/workspace"
              className="group inline-flex h-12 items-center gap-2 rounded-md bg-[#388BFF] px-6 text-base font-semibold text-white shadow-[0_8px_24px_rgba(56,139,255,0.25)] transition hover:bg-[#579DFF]"
            >
              Start extracting
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <span className="text-sm text-[#8C9BAB]">No account needed</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
