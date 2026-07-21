import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Text } from '@radix-ui/themes'
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
      {open && (
        <Box className="sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`app-sidebar${open ? ' sidebar-open' : ''}`}
        aria-label="Navigation"
      >
        <Box className="sidebar-scroll">
          {navigation.map(group => {
            const isCollapsed = collapsed[group.title] ?? false
            return (
              <Box key={group.title} mb="6">
                <button
                  className="sidebar-group-toggle"
                  onClick={() => toggleGroup(group.title)}
                  aria-expanded={!isCollapsed}
                >
                  <Text size="1" weight="bold" color="gray" className="sidebar-group-label">
                    {group.title}
                  </Text>
                  <ChevronDown
                    size={13}
                    className={`sidebar-chevron${isCollapsed ? ' sidebar-chevron--collapsed' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {!isCollapsed && (
                  <ul className="sidebar-nav-list">
                    {group.items.map(item => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `nav-link${isActive ? ' nav-link--active' : ''}`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </Box>
            )
          })}
        </Box>
      </aside>
    </>
  )
}
