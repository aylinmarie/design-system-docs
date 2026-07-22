declare module '*.mdx' {
  import type { ComponentType } from 'react'
  import type { Frontmatter } from './components/DocPage'

  export const frontmatter: Frontmatter
  const MDXComponent: ComponentType
  export default MDXComponent
}
