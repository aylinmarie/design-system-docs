export interface DesignSystemEntry {
  name: string
  url: string
}

const entries: DesignSystemEntry[] = [
  { name: 'Atlassian Design System', url: 'https://atlassian.design/design-system' },
  { name: 'Circuit (SumUp)', url: 'https://circuit.sumup.com/' },
]

export const designSystems: DesignSystemEntry[] = [...entries].sort((a, b) =>
  a.name.localeCompare(b.name)
)
