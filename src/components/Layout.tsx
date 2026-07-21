import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@radix-ui/themes'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Box>
      <Header onMenuToggle={() => setMenuOpen(p => !p)} menuOpen={menuOpen} />
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Box className="app-content">
        <Box className="app-article">
          <Outlet />
        </Box>
        <Box className="app-toc-spacer" />
      </Box>
    </Box>
  )
}
