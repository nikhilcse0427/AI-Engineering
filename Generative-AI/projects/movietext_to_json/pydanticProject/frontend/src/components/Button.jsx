import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-[#388BFF] text-white hover:bg-[#579DFF] shadow-[0_8px_24px_rgba(56,139,255,0.22)] focus-visible:ring-[#388BFF]',
  secondary:
    'bg-[#1C2330] text-[#F7F8F9] border border-white/10 hover:bg-[#242B3A] hover:border-white/15',
  ghost:
    'bg-transparent text-[#B3B9C4] hover:bg-white/5 hover:text-[#F7F8F9]',
  danger:
    'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/20 focus-visible:ring-rose-500',
}

const sizes = {
  sm: 'h-9 px-3 text-sm rounded-md',
  md: 'h-11 px-4 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-md',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <motion.button
      whileHover={disabled || loading ? undefined : { scale: 1.02 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#151A23] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </motion.button>
  )
}
