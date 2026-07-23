import { useState } from 'react'
import { Card, Flex, Text, Box } from '@radix-ui/themes'
import { Logomark } from '../Logomark'
import type { DesignSystemEntry } from '../../data/designSystems'

export function DesignSystemCard({ name, url }: DesignSystemEntry) {
  const [faviconFailed, setFaviconFailed] = useState(false)
  const { origin, hostname } = new URL(url)
  const faviconUrl = `${origin}/favicon.ico`

  return (
    <Card asChild variant="surface" size="1" className="ds-card">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Flex align="start" gap="3">
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
          <Box>
            <Text as="div" size="2" weight="bold">{name}</Text>
            <Text as="div" size="2" color="gray">{hostname.replace(/^www\./, '')}</Text>
          </Box>
        </Flex>
      </a>
    </Card>
  )
}
