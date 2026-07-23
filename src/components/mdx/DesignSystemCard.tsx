import { useState } from 'react'
import { Card, Flex, Text, Box } from '@radix-ui/themes'
import { Logomark } from '../Logomark'
import type { DesignSystemEntry } from '../../data/designSystems'

export function DesignSystemCard({ name, url }: DesignSystemEntry) {
  const [faviconFailed, setFaviconFailed] = useState(false)
  const faviconUrl = `${new URL(url).origin}/favicon.ico`

  return (
    <Card asChild variant="surface" size="1" className="ds-card">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Flex align="center" gap="3">
          <Box className="ds-card-thumb">
            {faviconFailed ? (
              <Logomark />
            ) : (
              <img
                src={faviconUrl}
                alt=""
                width={20}
                height={20}
                onError={() => setFaviconFailed(true)}
              />
            )}
          </Box>
          <Text size="2" weight="medium">{name}</Text>
        </Flex>
      </a>
    </Card>
  )
}
