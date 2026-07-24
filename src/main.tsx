import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MDXProvider } from '@mdx-js/react'
// Importing individual tokens instead of the full styles.css keeps only the
// color scales this site actually references (Theme uses gray + indigo;
// Callout/Badge use blue/violet/amber/green/red/orange) out of Radix's ~30.
import '@radix-ui/themes/tokens/base.css'
import '@radix-ui/themes/tokens/colors/gray.css'
import '@radix-ui/themes/tokens/colors/indigo.css'
import '@radix-ui/themes/tokens/colors/blue.css'
import '@radix-ui/themes/tokens/colors/violet.css'
import '@radix-ui/themes/tokens/colors/amber.css'
import '@radix-ui/themes/tokens/colors/green.css'
import '@radix-ui/themes/tokens/colors/red.css'
import '@radix-ui/themes/tokens/colors/orange.css'
import '@radix-ui/themes/components.css'
import '@radix-ui/themes/utilities.css'
import './index.css'
import { ThemeModeProvider } from './components/ThemeModeProvider'
import { getMDXComponents } from './mdxComponents'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeModeProvider>
      <MDXProvider components={getMDXComponents()}>
        <App />
      </MDXProvider>
    </ThemeModeProvider>
  </StrictMode>,
)
