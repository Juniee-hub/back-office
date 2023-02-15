'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { Breadcrumb, Layout, Menu } from 'antd'
import { usePathname } from 'next/navigation'
import _ from 'lodash'

import AdminProfile from '@/components/layout/profile'
import Clock from '@/components/layout/clock'
import { findActiveMenu, convertDataToAntdFormat } from '@/controller/menuSetup'

//TODO: 테마...
import styles from './layout.module.css'

const { Header, Content, Footer, Sider } = Layout

interface PropsType {
    children: JSX.Element
}

const AdminLayout = ({ children }: PropsType) => {
    const pathName = usePathname()

    const navMenu = useMemo(() => {
        const { depth1 } = findActiveMenu(pathName as string)
        return depth1
    }, [pathName])

    const navSelected = useMemo(() => {
        const activeIndex = _.findIndex(navMenu, { active: true })
        return [navMenu[activeIndex].key]
    }, [navMenu])

    const sideMenu = useMemo(() => {
        const { depth2 } = findActiveMenu(pathName as string)
        return depth2
    }, [pathName])

    const sideSelected = useMemo(() => {
        const activeIndex = _.findIndex(sideMenu, { active: true })
        const activedKey = sideMenu[activeIndex] ? [sideMenu[activeIndex]?.key] : []
        const children = activedKey ? sideMenu[activeIndex]?.children : []
        if (children) {
            const activeChildIndex = _.findIndex(children, { active: true })
            activedKey.push(children[activeChildIndex].key)
        }

        return activedKey
    }, [sideMenu])

    return (
        <Layout className={styles.body}>
            <Header className={styles.headWrap}>
                <Menu mode={'horizontal'} theme={'dark'} items={convertDataToAntdFormat(navMenu)} defaultSelectedKeys={navSelected} className={styles.navMenu} />
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
                    {convertDataToAntdFormat(sideMenu).length > 0 && (
                        <Sider collapsible className={styles.side}>
                            <Menu theme={'dark'} mode={'inline'} items={convertDataToAntdFormat(sideMenu)} defaultSelectedKeys={sideSelected} defaultOpenKeys={['3-2']} />
                        </Sider>
                    )}
                    <Content className={styles.content}>{children}</Content>
                </Layout>
            </Content>

            <Footer className={styles.footer}>Since 2023 © Plani by Juniee </Footer>
        </Layout>
    )
}

export default AdminLayout
