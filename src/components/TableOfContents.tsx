import { useEffect, useState } from 'react'
import { Text, Link } from '@radix-ui/themes'

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
          if (entry.isIntersecting) setActive(entry.target.id)
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
    <nav className="app-toc" aria-label="On this page">
      <Text size="1" weight="bold" color="gray" className="toc-heading">On this page</Text>
      <ul className="toc-list">
        {items.map(item => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              size="1"
              color={active === item.id ? 'violet' : 'gray'}
              weight={active === item.id ? 'medium' : 'regular'}
              underline="none"
              className={`toc-link${item.level === 3 ? ' toc-link--sub' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
