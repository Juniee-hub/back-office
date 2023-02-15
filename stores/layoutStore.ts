import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Theme } from '@/types/theme'

interface LayoutStore {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export const useLayoutStore = create<LayoutStore>()(
    devtools((set) => ({
        theme: 'light',
        setTheme: (theme: Theme) => set({ theme }),
    }))
)
