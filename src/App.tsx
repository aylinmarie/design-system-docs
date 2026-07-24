import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { lazy, Suspense, type ComponentType } from 'react'
import { Layout } from './components/Layout'
import { DocPage, type Frontmatter } from './components/DocPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'

function docRoute(path: string, load: () => Promise<{ default: ComponentType; frontmatter: Frontmatter }>) {
  const LazyPage = lazy(() =>
    load().then(({ default: Content, frontmatter }) => ({
      default: () => (
        <DocPage {...frontmatter}>
          <Content />
        </DocPage>
      ),
    })),
  )

  return (
    <Route
      key={path}
      path={path}
      element={
        <Suspense fallback={null}>
          <LazyPage />
        </Suspense>
      }
    />
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {docRoute('/', () => import('./pages/Introduction.mdx'))}
          {docRoute('/what-is-a-design-system', () => import('./pages/WhatIsADesignSystem.mdx'))}
          {docRoute('/design-tokens', () => import('./pages/DesignTokens.mdx'))}
          {docRoute('/typography', () => import('./pages/Typography.mdx'))}
          {docRoute('/color', () => import('./pages/Color.mdx'))}
          {docRoute('/spacing', () => import('./pages/Spacing.mdx'))}
          {docRoute('/iconography', () => import('./pages/Iconography.mdx'))}
          {docRoute('/accessibility', () => import('./pages/Accessibility.mdx'))}
          {docRoute('/accessibility/color-contrast', () => import('./pages/AccessibilityContrast.mdx'))}
          {docRoute('/accessibility/keyboard', () => import('./pages/AccessibilityKeyboard.mdx'))}
          {docRoute('/accessibility/aria', () => import('./pages/AccessibilityAria.mdx'))}
          {docRoute('/data-viz', () => import('./pages/DataViz.mdx'))}
          {docRoute('/data-viz/color', () => import('./pages/DataVizColor.mdx'))}
          {docRoute('/data-viz/charts', () => import('./pages/DataVizCharts.mdx'))}
          {docRoute('/component-api', () => import('./pages/ComponentApi.mdx'))}
          {docRoute('/composition', () => import('./pages/Composition.mdx'))}
          {docRoute('/governance', () => import('./pages/Governance.mdx'))}
          {docRoute('/versioning', () => import('./pages/Versioning.mdx'))}
          {docRoute('/design-system-collection', () => import('./pages/DesignSystemCollection.mdx'))}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
