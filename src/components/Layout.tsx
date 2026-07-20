import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header
        onMenuToggle={() => setMenuOpen(prev => !prev)}
        menuOpen={menuOpen}
      />

      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main
        className="min-h-screen"
        style={{
          marginLeft: 'var(--sidebar-width)',
          paddingTop: 'var(--header-height)',
        }}
      >
        {/* Content + TOC wrapper */}
        <div className="flex">
          {/* Main content */}
          <div
            className="flex-1 px-8 py-10 min-w-0"
            style={{ maxWidth: '820px' }}
          >
            <Outlet />
          </div>
          {/* TOC placeholder width */}
          <div style={{ width: 'var(--toc-width)', flexShrink: 0 }} className="hidden xl:block" />
        </div>
      </main>
    </div>
  )
}
