import Link from 'next/link'
import { DashboardOutlined, ProfileOutlined, UserOutlined, UnorderedListOutlined, ExportOutlined, SwapRightOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { MenuItem, AntdMenuItem } from '@/types/menu'

const adminFolderName: string = 'webadm'

//TODO: Databse or API Fetch로 변경 고려해보기..
const menuInfo: MenuItem[] = [
    {
        key: '1',
        name: '대시보드',
        url: `/${adminFolderName}`,
        active: false,
        icon: <DashboardOutlined />,
    },
    {
        key: '2',
        name: '유저',
        url: `/${adminFolderName}/user`,
        active: false,
        icon: <UserOutlined />,
    },
    {
        key: '3',
        name: '게시판',
        url: '',
        active: false,
        icon: <ProfileOutlined />,
        children: [
            {
                key: '3-1',
                name: '설정',
                url: `/${adminFolderName}/board/setup`,
                active: false,
                icon: <ExportOutlined />,
            },
            {
                key: '3-2',
                name: '목록',
                url: '',
                active: false,
                icon: <UnorderedListOutlined />,
                children: [
                    {
                        key: '3-2-1',
                        name: '공지사항',
                        url: `/${adminFolderName}/board/notice`,
                        active: false,
                        icon: <SwapRightOutlined />,
                    },
                    {
                        key: '3-2-2',
                        name: '자유게시판',
                        url: `/${adminFolderName}/board/free`,
                        active: false,
                        icon: <SwapRightOutlined />,
                    },
                ],
            },
        ],
    },
]

function findItemsWithSameUrl(items: MenuItem[], url: string): MenuItem[] {
    let result: MenuItem[] = []

    for (let item of items) {
        if (item.url === url) {
            result.push(item)
        }
        if (item.children) {
            const childrenResult = findItemsWithSameUrl(item.children, url)
            result = result.concat(childrenResult)
        }
    }

    return result
}

export const findActiveMenu = (findUrl: string) => {
    const defaultMenuInfo = [...menuInfo]
    const atciveMenu = findItemsWithSameUrl([...defaultMenuInfo], findUrl).shift()

    if (atciveMenu) {
        const parentKeys = atciveMenu.key.split('-')

        const depth1Key = parentKeys[0]
        const depth2Key = parentKeys.slice(0, 2).join('-')
        const depth3Key = parentKeys.slice(0, 3).join('-')

        const depth1Index = _.findIndex([...defaultMenuInfo], { key: parentKeys[0] })

        const activeDepth1 = { ...defaultMenuInfo[depth1Index], active: true }
        delete defaultMenuInfo[depth1Index]
        defaultMenuInfo[depth1Index] = activeDepth1
        const depth1 = [...defaultMenuInfo]

        let depth2: MenuItem[] = activeDepth1.children ? [...activeDepth1.children] : []
        let depth3: MenuItem[] = []

        // active 할 depth2가 있으면,
        const depth2Index = _.findIndex(activeDepth1.children, { key: depth2Key })
        if (depth2Index >= 0 && activeDepth1.children != undefined) {
            const activeDepth2 = { ...activeDepth1.children[depth2Index], active: true }
            delete activeDepth1.children[depth2Index]
            activeDepth1.children[depth2Index] = activeDepth2
            depth2 = [...activeDepth1.children]

            // active 할 depth3가 있으면,
            const depth3Index = _.findIndex(activeDepth2.children, { key: depth3Key })
            if (depth3Index >= 0 && activeDepth2.children != undefined) {
                const activeDepth3 = { ...activeDepth2.children[depth3Index], active: true }
                delete activeDepth2.children[depth3Index]
                activeDepth2.children[depth3Index] = activeDepth3
                depth3 = [...activeDepth2.children]
            }
        }

        return { depth1, depth2, depth3 }
    } else {
        return { depth1: [], depth2: [], depth3: [] }
    }
}

export const convertDataToAntdFormat = (menu: MenuItem[]): AntdMenuItem[] => {
    const formatedMenu: AntdMenuItem[] = menu.map((m) => {
        const { key, name, url, icon, children } = m
        const convertMenuType = {
            key,
            label: children ? name : <Link href={url}>{name}</Link>,
            icon,
            ...(children && { children: convertDataToAntdFormat(children) }),
        }
        return { ...convertMenuType }
    })

    return formatedMenu
}
