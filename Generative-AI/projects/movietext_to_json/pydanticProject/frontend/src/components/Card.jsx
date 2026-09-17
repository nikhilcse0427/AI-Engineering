import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = true,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`rounded-2xl border border-white/10 bg-[#1C2330]/90 shadow-lg shadow-black/20 ${
        glass ? 'backdrop-blur-xl' : ''
      } ${padding ? 'p-6' : ''} ${hover ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
