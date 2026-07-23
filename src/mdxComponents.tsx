import { Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

interface HeadingLikeProps {
  id?: string
  children?: ReactNode
}

function H2({ id, children }: HeadingLikeProps) {
  return (
    <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={id}>
      {children}
    </Heading>
  )
}

function P({ children }: HeadingLikeProps) {
  return (
    <Text as="p" size="3" mb="3">
      {children}
    </Text>
  )
}

export function getMDXComponents() {
  return { h2: H2, p: P }
}
