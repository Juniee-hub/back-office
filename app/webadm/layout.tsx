'use client'
import React from 'react'
import Image from 'next/image'
import { DashboardOutlined, ProfileOutlined, UserOutlined, UnorderedListOutlined, ExportOutlined, SwapRightOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd'

import AdminProfile from '@/components/layout/profile'
import Clock from '@/components/layout/clock'

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
                <Menu mode={'horizontal'} theme={'dark'} items={navMenu} defaultSelectedKeys={['3']} className={styles.navMenu} />
                <div className={styles.logoWrap}>
                    <Image src={'/images/logo.png'} fill alt={'logo..'} priority />
                </div>
                <div className={styles.profileWrap}>
                    <Clock />
                    <AdminProfile />
                </div>
            </Header>

            <Content className={styles.mainWrap}>
                <Breadcrumb className={styles.navi}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>

                <Layout className={styles.container}>
                    <Sider collapsible className={styles.side}>
                        <Menu theme={'dark'} mode={'inline'} items={sideMenu} defaultSelectedKeys={['3-2', '3-2-2']} defaultOpenKeys={['3-2']} />
                    </Sider>
                    <Content className={styles.content}>{children}</Content>
                </Layout>
            </Content>

            <Footer className={styles.footer}>Since 2023 © Plani by Juniee </Footer>
        </Layout>
    )
}

export default AdminLayout
