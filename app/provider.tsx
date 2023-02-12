'use client'
import { ConfigProvider } from 'antd'
import 'dayjs/locale/ko'
import locale from 'antd/locale/ko_KR'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { layoutStore } from '@/stores/layoutStore'
import { ThemeSetting } from '@/types/theme'

const adminThemeSetting: ThemeSetting = {
    dark: {
        token: {
            colorPrimary: '#88d19c',
            wireframe: false,
            borderRadius: 9,
            colorInfo: '#c689e2',
        },
    },
    light: {
        token: {
            colorPrimary: '#c64cda',
            wireframe: false,
            borderRadius: 9,
            colorInfo: '#FADB14',
            colorBgBase: '#323131',
        },
    },
}

interface LayoutStore {
    adminNowTheme: 'dark' | 'light'
}

const queryClient = new QueryClient()
export function Providers({ children }: { children: JSX.Element }) {
    const { adminNowTheme }: LayoutStore = layoutStore()

    // TODO: interface, type alias, class 로 변경해보기..... 현재는 Tuple로 사용중... 가독성이 별로...ㅠㅠ
    const nowTheme = adminThemeSetting[adminNowTheme]

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider locale={locale} theme={{ ...nowTheme }}>
                    {children}
                </ConfigProvider>
            </QueryClientProvider>
        </>
    )
}
