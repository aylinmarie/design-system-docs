import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MDXProvider } from '@mdx-js/react'
import '@radix-ui/themes/styles.css'
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
