import { Callout as RadixCallout, Text } from '@radix-ui/themes'
import { Info, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react'
import { type ReactNode } from 'react'

type CalloutType = 'info' | 'tip' | 'warning' | 'success'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const config: Record<CalloutType, {
  icon: typeof Info
  color: 'blue' | 'violet' | 'amber' | 'green'
}> = {
  info: { icon: Info, color: 'blue' },
  tip: { icon: Lightbulb, color: 'violet' },
  warning: { icon: AlertTriangle, color: 'amber' },
  success: { icon: CheckCircle, color: 'green' },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon: Icon, color } = config[type]
  return (
    <RadixCallout.Root color={color} variant="soft" my="5">
      <RadixCallout.Icon>
        <Icon size={15} aria-hidden="true" />
      </RadixCallout.Icon>
      <Text as="div" size="2" className="rt-CalloutText">
        {title && <span className="callout-title">{title}</span>}
        {children}
      </Text>
    </RadixCallout.Root>
  )
}
