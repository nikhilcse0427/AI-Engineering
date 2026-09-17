import { Inbox } from 'lucide-react'

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = 'Your results will appear in this space.',
  action,
}) {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#1C2330]/60 px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#388BFF]/15">
        <Icon className="h-6 w-6 text-[#579DFF]" />
      </div>
      <h3 className="text-base font-semibold text-[#F7F8F9]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#8C9BAB]">{description}</p>
      {action && <div className="mt-5 w-full">{action}</div>}
    </div>
  )
}
