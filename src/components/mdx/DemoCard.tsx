import { Box, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

interface DemoCardProps {
  label?: string
  children: ReactNode
}

export function DemoCard({ label, children }: DemoCardProps) {
  return (
    <Box className="demo-card">
      {label && (
        <Box className="demo-card-header">
          <Text size="1" weight="bold" color="gray" className="demo-label">
            {label}
          </Text>
        </Box>
      )}
      {children}
    </Box>
  )
}
