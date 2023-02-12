interface Token {
    colorPrimary: string
    wireframe?: boolean
    borderRadius?: number
    colorInfo?: string
    colorBgBase?: string
}

export interface ThemeSetting {
    dark: {
        token: Token
    }
    light: {
        token: Token
    }
}
