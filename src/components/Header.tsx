import { Box, Text, IconButton, TextField, Kbd, Link } from '@radix-ui/themes'
import { Search, Menu, X } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'

interface HeaderProps {
  onMenuToggle: () => void
  menuOpen: boolean
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  return (
    <header className="app-header">
      <Box className="header-inner">
        {/* Logo */}
        <RouterLink to="/" className="header-logo">
          <Box className="logo-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
            </svg>
          </Box>
          <Text size="2" weight="medium" color="gray">Design Systems Guide</Text>
        </RouterLink>

        {/* Search */}
        <Box className="header-search">
          <TextField.Root size="1" placeholder="Search docs…" aria-label="Search docs">
            <TextField.Slot>
              <Search size={13} aria-hidden="true" />
            </TextField.Slot>
            <TextField.Slot side="right">
              <Kbd size="1">⌘K</Kbd>
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <Box className="header-spacer" />

        {/* GitHub link */}
        <Box className="header-nav">
          <Link
            href="https://github.com/aylinmarie/design-system-docs"
            target="_blank"
            rel="noopener noreferrer"
            size="2"
            color="gray"
            highContrast
            className="header-link"
          >
            GitHub
          </Link>
        </Box>

        {/* Mobile menu toggle */}
        <IconButton
          variant="ghost"
          color="gray"
          onClick={onMenuToggle}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="header-toggle"
          size="2"
        >
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </IconButton>
      </Box>
    </header>
  )
}
