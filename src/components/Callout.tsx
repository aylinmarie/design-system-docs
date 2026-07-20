import { Info, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react'
import { type ReactNode } from 'react'

type CalloutType = 'info' | 'tip' | 'warning' | 'success'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const config: Record<CalloutType, { icon: typeof Info; bg: string; border: string; iconColor: string; titleColor: string }> = {
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    iconColor: 'text-violet-500',
    titleColor: 'text-violet-800',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-800',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-500',
    titleColor: 'text-green-800',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon: Icon, bg, border, iconColor, titleColor } = config[type]

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${bg} ${border} my-4`} role="note">
      <Icon size={16} className={`${iconColor} flex-shrink-0 mt-0.5`} aria-hidden="true" />
      <div className="text-sm leading-relaxed">
        {title && (
          <p className={`font-semibold ${titleColor} mb-1`}>{title}</p>
        )}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  )
}
