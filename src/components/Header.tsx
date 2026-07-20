import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  onMenuToggle: () => void
  menuOpen: boolean
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
      style={{ height: 'var(--header-height)' }}
    >
      <div className="flex items-center h-full px-4 max-w-[1400px] mx-auto gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 flex-shrink-0 no-underline"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--color-accent)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-gray-900 tracking-tight">
            Design Systems Guide
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xs hidden sm:block">
          <label className="sr-only" htmlFor="search">Search docs</label>
          <div
            className={`flex items-center gap-2 px-3 h-8 rounded-md border text-sm transition-colors ${
              searchFocused ? 'border-violet-400 bg-white' : 'border-gray-200 bg-gray-50'
            }`}
          >
            <Search size={13} className="text-gray-400 flex-shrink-0" />
            <input
              id="search"
              type="text"
              placeholder="Search docs..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-xs"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="text-gray-400 text-xs font-mono bg-white border border-gray-200 rounded px-1 py-0.5 hidden md:block">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex-1" />

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-5 text-sm text-gray-500">
          <a
            href="https://github.com"
            className="hover:text-gray-900 transition-colors no-underline"
            style={{ textDecoration: 'none' }}
          >
            GitHub
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
          onClick={onMenuToggle}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  )
}
