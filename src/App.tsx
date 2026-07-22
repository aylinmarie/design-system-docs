import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import type { ComponentType } from 'react'
import { Layout } from './components/Layout'
import { DocPage, type Frontmatter } from './components/DocPage'

import Introduction, { frontmatter as introductionFm } from './pages/Introduction.mdx'
import WhatIsADesignSystem, { frontmatter as whatIsADesignSystemFm } from './pages/WhatIsADesignSystem.mdx'
import DesignTokens, { frontmatter as designTokensFm } from './pages/DesignTokens.mdx'
import Typography, { frontmatter as typographyFm } from './pages/Typography.mdx'
import Color, { frontmatter as colorFm } from './pages/Color.mdx'
import Spacing, { frontmatter as spacingFm } from './pages/Spacing.mdx'
import Iconography, { frontmatter as iconographyFm } from './pages/Iconography.mdx'
import Accessibility, { frontmatter as accessibilityFm } from './pages/Accessibility.mdx'
import AccessibilityContrast, { frontmatter as accessibilityContrastFm } from './pages/AccessibilityContrast.mdx'
import AccessibilityKeyboard, { frontmatter as accessibilityKeyboardFm } from './pages/AccessibilityKeyboard.mdx'
import AccessibilityAria, { frontmatter as accessibilityAriaFm } from './pages/AccessibilityAria.mdx'
import DataViz, { frontmatter as dataVizFm } from './pages/DataViz.mdx'
import DataVizColor, { frontmatter as dataVizColorFm } from './pages/DataVizColor.mdx'
import DataVizCharts, { frontmatter as dataVizChartsFm } from './pages/DataVizCharts.mdx'
import ComponentApi, { frontmatter as componentApiFm } from './pages/ComponentApi.mdx'
import Composition, { frontmatter as compositionFm } from './pages/Composition.mdx'
import Governance, { frontmatter as governanceFm } from './pages/Governance.mdx'
import Versioning, { frontmatter as versioningFm } from './pages/Versioning.mdx'
import DSCollections, { frontmatter as dsCollectionsFm } from './pages/DSCollections.mdx'

function docRoute(path: string, Content: ComponentType, frontmatter: Frontmatter) {
  return (
    <Route
      key={path}
      path={path}
      element={
        <DocPage {...frontmatter}>
          <Content />
        </DocPage>
      }
    />
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {docRoute('/', Introduction, introductionFm)}
          {docRoute('/what-is-a-design-system', WhatIsADesignSystem, whatIsADesignSystemFm)}
          {docRoute('/design-tokens', DesignTokens, designTokensFm)}
          {docRoute('/typography', Typography, typographyFm)}
          {docRoute('/color', Color, colorFm)}
          {docRoute('/spacing', Spacing, spacingFm)}
          {docRoute('/iconography', Iconography, iconographyFm)}
          {docRoute('/accessibility', Accessibility, accessibilityFm)}
          {docRoute('/accessibility/color-contrast', AccessibilityContrast, accessibilityContrastFm)}
          {docRoute('/accessibility/keyboard', AccessibilityKeyboard, accessibilityKeyboardFm)}
          {docRoute('/accessibility/aria', AccessibilityAria, accessibilityAriaFm)}
          {docRoute('/data-viz', DataViz, dataVizFm)}
          {docRoute('/data-viz/color', DataVizColor, dataVizColorFm)}
          {docRoute('/data-viz/charts', DataVizCharts, dataVizChartsFm)}
          {docRoute('/component-api', ComponentApi, componentApiFm)}
          {docRoute('/composition', Composition, compositionFm)}
          {docRoute('/governance', Governance, governanceFm)}
          {docRoute('/versioning', Versioning, versioningFm)}
          {docRoute('/resources/ds-collections', DSCollections, dsCollectionsFm)}
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
