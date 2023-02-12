import React from 'react'
import { SmileOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar, Badge, Space, Dropdown } from 'antd'
import type { MenuProps } from 'antd'

import styles from './profile.module.css'

//TODO: 폰트 이미지 적용

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <span
                className={styles.btnWrap}
                onClick={() => {
                    console.log('logout Btn Click!!!')
                }}
            >
                <LogoutOutlined />
                로그아웃
            </span>
        ),
    },
]

const AdminProfile = () => {
    return (
        <Space size={24} className={styles.wrap}>
            <Dropdown menu={{ items }} placement="bottom" arrow trigger={['hover']}>
                <Badge dot>
                    <Avatar shape="square" icon={<SmileOutlined />} />
                </Badge>
            </Dropdown>
        </Space>
    )
}

export default AdminProfile
