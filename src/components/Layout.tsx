import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@radix-ui/themes'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Box>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header onMenuToggle={() => setMenuOpen(p => !p)} menuOpen={menuOpen} />
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Box className="app-content" ml={{ initial: '0', sm: 'var(--sidebar-width)' }}>
        <Box
          asChild
          className="app-article"
          px={{ initial: '5', sm: '7', md: '8' }}
          py={{ initial: '7', sm: '8', md: '9' }}
        >
          <main id="main-content" tabIndex={-1}>
            <Outlet />
            <Footer />
          </main>
        </Box>
        <Box className="app-toc-spacer" display={{ initial: 'none', lg: 'block' }} />
      </Box>
    </Box>
  )
}
