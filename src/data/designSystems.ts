export interface DesignSystemEntry {
  name: string
  url: string
  /** Skip favicon lookup and show the generic mark instead (e.g. the site's favicon isn't actually theirs). */
  noFavicon?: boolean
}

const entries: DesignSystemEntry[] = [
  { name: 'Atlassian', url: 'https://atlassian.design/design-system' },
  { name: 'Spectrum (Adobe)', url: 'https://spectrum.adobe.com' },
  { name: 'Base (Uber)', url: 'https://base.uber.com/', noFavicon: true },
  { name: 'Carbon (IBM)', url: 'https://carbondesignsystem.com/' },
  { name: 'Circuit (SumUp)', url: 'https://circuit.sumup.com/' },
  { name: 'Polaris (Shopify)', url: 'https://shopify.dev/docs/api/app-home/web-components' },
  { name: 'Primer (GitHub)', url: 'https://primer.style/' },
]

export const designSystems: DesignSystemEntry[] = [...entries].sort((a, b) =>
  a.name.localeCompare(b.name)
)
