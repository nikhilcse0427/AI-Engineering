export default function Textarea({
  id,
  label,
  value,
  onChange,
  placeholder = 'Paste your text here...',
  rows = 14,
  disabled = false,
  className = '',
}) {
  return (
    <div className={`flex h-full flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#B3B9C4]">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-[280px] w-full flex-1 resize-y rounded-xl border border-white/10 bg-[#12171F] px-4 py-3 text-sm leading-relaxed text-[#F7F8F9] outline-none transition placeholder:text-[#626F86] focus:border-[#388BFF]/60 focus:ring-4 focus:ring-[#388BFF]/15 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  )
}
