'use client'
import React from 'react'
import { MenuProps, Slider } from 'antd'
import { DashboardOutlined, ProfileOutlined, UserOutlined, UnorderedListOutlined, ExportOutlined, SwapRightOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'

import AdminProfile from '@/components/layout/profile'

//TODO: 테마...
import styles from './layout.module.css'

const { Header, Content, Footer, Sider } = Layout

//TODO: 메뉴 시스템 어떻게 할지 고민하기....
const navMenu = [
    {
        key: '1',
        label: '대시보드',
        icon: <DashboardOutlined />,
    },
    {
        key: '2',
        label: '유저',
        icon: <UserOutlined />,
    },
    {
        key: '3',
        label: '게시판',
        icon: <ProfileOutlined />,
    },
]
const sideMenu = [
    {
        key: '3-1',
        label: '게시판 등록',
        icon: <ExportOutlined />,
    },
    {
        key: '3-2',
        label: '목록',
        icon: <UnorderedListOutlined />,
        children: [
            {
                key: '3-2-1',
                label: '공지사항',
                icon: <SwapRightOutlined />,
            },
            {
                key: '3-2-2',
                label: '자유게시판',
                icon: <SwapRightOutlined />,
            },
        ],
    },
]

interface PropsType {
    children: JSX.Element
}

const AdminLayout = ({ children }: PropsType) => {
    return (
        <Layout className={styles.body}>
            <Header className={styles.headWrap}>
                <div className={styles.logoWrap}>Logo 자리...</div>
                <Menu mode={'horizontal'} theme={'dark'} items={navMenu} defaultSelectedKeys={['3']} className={styles.navMenu} />
                <AdminProfile />
            </Header>

            <Content className={styles.mainWrap}>
                <Breadcrumb className={styles.navi}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>

                <Layout className={styles.container}>
                    <Sider collapsible className={styles.side}>
                        <Menu theme={'dark'} mode={'inline'} items={sideMenu} defaultSelectedKeys={['3-2', '3-2-2']} />
                    </Sider>
                    <Content className={styles.content}>{children}</Content>
                </Layout>
            </Content>

            <Footer className={styles.footer}>Since 2023 © Plani by Juniee </Footer>
        </Layout>
    )
}

export default AdminLayout
