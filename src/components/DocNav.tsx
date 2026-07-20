import { Link } from 'react-router-dom'
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
    <nav className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline"
          style={{ textDecoration: 'none' }}
        >
          <ChevronLeft size={15} className="text-gray-400 group-hover:text-violet-600 transition-colors" />
          <span>
            <span className="block text-xs text-gray-400 mb-0.5">Previous</span>
            {prev.label}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={next.path}
          className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors text-right no-underline"
          style={{ textDecoration: 'none' }}
        >
          <span>
            <span className="block text-xs text-gray-400 mb-0.5">Next</span>
            {next.label}
          </span>
          <ChevronRight size={15} className="text-gray-400 group-hover:text-violet-600 transition-colors" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
