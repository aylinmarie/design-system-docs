import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Layout } from './components/Layout'
import { Introduction } from './pages/Introduction'
import { WhatIsADesignSystem } from './pages/WhatIsADesignSystem'
import { DesignTokens } from './pages/DesignTokens'
import { Typography } from './pages/Typography'
import { Color } from './pages/Color'
import { Spacing } from './pages/Spacing'
import { Iconography } from './pages/Iconography'
import { Accessibility } from './pages/Accessibility'
import { AccessibilityContrast } from './pages/AccessibilityContrast'
import { AccessibilityKeyboard } from './pages/AccessibilityKeyboard'
import { AccessibilityAria } from './pages/AccessibilityAria'
import { DataViz } from './pages/DataViz'
import { DataVizColor } from './pages/DataVizColor'
import { DataVizCharts } from './pages/DataVizCharts'
import { ComponentApi } from './pages/ComponentApi'
import { Composition } from './pages/Composition'
import { Governance } from './pages/Governance'
import { Versioning } from './pages/Versioning'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Introduction />} />
          <Route path="/what-is-a-design-system" element={<WhatIsADesignSystem />} />
          <Route path="/design-tokens" element={<DesignTokens />} />
          <Route path="/typography" element={<Typography />} />
          <Route path="/color" element={<Color />} />
          <Route path="/spacing" element={<Spacing />} />
          <Route path="/iconography" element={<Iconography />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/accessibility/color-contrast" element={<AccessibilityContrast />} />
          <Route path="/accessibility/keyboard" element={<AccessibilityKeyboard />} />
          <Route path="/accessibility/aria" element={<AccessibilityAria />} />
          <Route path="/data-viz" element={<DataViz />} />
          <Route path="/data-viz/color" element={<DataVizColor />} />
          <Route path="/data-viz/charts" element={<DataVizCharts />} />
          <Route path="/component-api" element={<ComponentApi />} />
          <Route path="/composition" element={<Composition />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/versioning" element={<Versioning />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
