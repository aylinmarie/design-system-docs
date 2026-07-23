import { Box, Flex, Text, Separator, Link } from '@radix-ui/themes'
import { Link as RouterLink } from 'react-router-dom'

export function Footer() {
  return (
    <Box className="site-footer">
      <Separator size="4" mb="5" />
      <Flex justify="between" align="center" wrap="wrap" gap="3">
        <Text size="1" color="gray">
          &copy; {new Date().getFullYear()} Design Systems Docs
        </Text>
        <Flex gap="4">
          <Link
            href="https://github.com/aylinmarie/design-system-docs"
            target="_blank"
            rel="noopener noreferrer"
            size="1"
            color="gray"
            underline="hover"
          >
            GitHub
          </Link>
          <Link asChild size="1" color="gray" underline="hover">
            <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
