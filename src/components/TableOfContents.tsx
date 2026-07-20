import { useEffect, useState } from 'react'

export interface TocItem {
  id: string
  label: string
  level: 2 | 3
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (!items.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-60px 0px -70% 0px', threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav
      className="hidden xl:block fixed top-[var(--header-height)] right-0 pt-8 pb-6 px-6 overflow-y-auto"
      style={{ width: 'var(--toc-width)', height: 'calc(100vh - var(--header-height))' }}
      aria-label="On this page"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {items.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-xs py-1 transition-colors no-underline ${
                item.level === 3 ? 'pl-3' : ''
              } ${
                active === item.id
                  ? 'text-violet-600 font-medium'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              style={{ textDecoration: 'none' }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
