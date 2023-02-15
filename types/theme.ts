interface Token {
    colorPrimary: string
    wireframe?: boolean
    borderRadius?: number
    colorInfo?: string
    colorBgBase?: string
}
export type Theme = 'dark' | 'light'
export interface ThemeSetting {
    dark: {
        token: Token
    }
    light: {
        token: Token
    }
}
