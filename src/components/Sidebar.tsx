import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { navigation } from '../data/navigation'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleGroup = (title: string) => {
    setCollapsed(prev => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full bg-white border-r border-gray-100
          transition-transform duration-200 ease-in-out
          md:translate-x-0 md:top-[var(--header-height)]
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ width: 'var(--sidebar-width)', paddingTop: 'var(--header-height)' }}
        aria-label="Navigation"
      >
        <div className="h-full overflow-y-auto py-6 px-4">
          {navigation.map(group => {
            const isCollapsed = collapsed[group.title] ?? false

            return (
              <div key={group.title} className="mb-6">
                <button
                  className="flex items-center justify-between w-full mb-1.5 group"
                  onClick={() => toggleGroup(group.title)}
                  aria-expanded={!isCollapsed}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-gray-600 transition-colors">
                    {group.title}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`text-gray-300 transition-transform duration-150 ${
                      isCollapsed ? '-rotate-90' : ''
                    }`}
                  />
                </button>

                {!isCollapsed && (
                  <ul className="space-y-0.5" role="list">
                    {group.items.map(item => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `block px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                              isActive
                                ? 'bg-violet-50 text-violet-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </aside>
    </>
  )
}
