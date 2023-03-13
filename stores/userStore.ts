import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Tab } from '@/types/user'

interface TabStore {
    tab: Tab
    setTab: (tab: Tab) => void
}

export const useUserStore = create<TabStore>()(
    devtools((set) => ({
        tab: 'OverView',
        setTab: (tab: Tab) => set({ tab }),
    }))
)
