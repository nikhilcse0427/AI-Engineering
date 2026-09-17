import { motion } from 'framer-motion'

export default function Loader({ label = 'Processing…', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-10 ${className}`}>
      <motion.div
        className="h-10 w-10 rounded-full border-[3px] border-[#2A3544] border-t-[#388BFF]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
      />
      <p className="text-sm font-medium text-[#8C9BAB]">{label}</p>
    </div>
  )
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-2xl bg-[#242B3A] ${className}`} />
}
