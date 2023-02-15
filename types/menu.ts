export interface MenuItem {
    key: string
    name: string
    url: string
    active: boolean
    icon?: React.ReactNode
    children?: MenuItem[]
}
export interface AntdMenuItem {
    key: string
    label: React.ReactNode
    icon?: React.ReactNode
    title?: string
    children?: AntdMenuItem[]
}
