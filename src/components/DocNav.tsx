import { Box, Flex, Text, Separator, Link } from '@radix-ui/themes'
import { Link as RouterLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { navigation } from '../data/navigation'

interface DocNavProps {
  currentPath: string
}

export function DocNav({ currentPath }: DocNavProps) {
  const allItems = navigation.flatMap(group => group.items)
  const idx = allItems.findIndex(item => item.path === currentPath)
  const prev = idx > 0 ? allItems[idx - 1] : null
  const next = idx < allItems.length - 1 ? allItems[idx + 1] : null

  if (!prev && !next) return null

  return (
    <Box mt="8">
      <Separator size="4" mb="5" />
      <Flex justify="between" align="center">
        {prev ? (
          <Link asChild color="gray" underline="none" className="docnav-link">
            <RouterLink to={prev.path}>
              <Flex align="center" gap="2">
                <ChevronLeft size={14} className="docnav-icon" aria-hidden="true" />
                <Box>
                  <Text as="div" size="1" color="gray">Previous</Text>
                  <Text as="div" size="2" weight="medium">{prev.label}</Text>
                </Box>
              </Flex>
            </RouterLink>
          </Link>
        ) : <Box />}
        {next ? (
          <Link asChild color="gray" underline="none" className="docnav-link">
            <RouterLink to={next.path}>
              <Flex align="center" gap="2">
                <Box style={{ textAlign: 'right' }}>
                  <Text as="div" size="1" color="gray">Next</Text>
                  <Text as="div" size="2" weight="medium">{next.label}</Text>
                </Box>
                <ChevronRight size={14} className="docnav-icon" aria-hidden="true" />
              </Flex>
            </RouterLink>
          </Link>
        ) : <Box />}
      </Flex>
    </Box>
  )
}
