import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Theme } from '@radix-ui/themes'

type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'theme-mode'

interface ThemeModeContextValue {
  mode: ThemeMode
  toggle: () => void
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null)

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  const toggle = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <Theme grayColor="gray" radius="large" scaling="95%" appearance={mode}>
        {children}
      </Theme>
    </ThemeModeContext.Provider>
  )
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext)
  if (!ctx) throw new Error('useThemeMode must be used within a ThemeModeProvider')
  return ctx
}
