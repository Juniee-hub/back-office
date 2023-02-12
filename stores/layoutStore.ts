import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Theme = 'dark' | 'light'

interface LayoutStore {
    adminNowTheme: Theme
    setHandelTheme: (value: Theme) => void
}

export const layoutStore = create<LayoutStore>()(
    devtools((set) => ({
        adminNowTheme: 'dark',
        setHandelTheme: (value: 'dark' | 'light') => set((state) => ({ ...state, adminNowTheme: value })),
    }))
)
