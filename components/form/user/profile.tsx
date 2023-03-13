'use client'
import React from 'react'
import { Single_Day, Nanum_Gothic, Gamja_Flower, Sono } from 'next/font/google'
import { Tabs, Avatar, Badge, Button, Progress } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined, CheckCircleFilled, HomeFilled, LineOutlined, PhoneFilled, SkinFilled } from '@ant-design/icons'

import _ from 'lodash'

import { useUserStore } from '@/stores/userStore'

import styles from './profile.module.css'
import type { Tab } from '@/types/user'

const singDay = Single_Day({ weight: '400' })
const nanumGothic = Nanum_Gothic({ weight: '400', subsets: ['latin'] })
const gamja = Gamja_Flower({ weight: '400', subsets: ['latin'] })
const sono = Sono({ weight: '400', subsets: ['latin'] })

type TabItem = {
    key: string
    label: Tab
    children?: JSX.Element
}

const items: TabItem[] = [
    {
        key: '1',
        label: 'OverView',
    },
    {
        key: '2',
        label: 'Settings',
    },
]

type userStateToBadge = 'success' | 'error' | 'waring'
const badgeSize = 200
const badgeYPosition = badgeSize * 0.75

const UserFormProfile = () => {
    //@TODO: 사용자 상태에 따라, badge 색깔 변경
    const badgeStatus: userStateToBadge = 'success'

    // TAB Change.....
    const { tab, setTab } = useUserStore()
    const tabChangeAction = (key: string) => {
        const activeItem = _.find(items, { key })
        if (activeItem?.label) {
            setTab(activeItem.label)
        }
    }

    return (
        <section className={styles.wrap}>
            <article>
                <Badge dot status={badgeStatus} offset={[1, badgeYPosition]}>
                    <Avatar shape={'square'} size={badgeSize} src={`https://picsum.photos/${badgeSize}`} />
                </Badge>

                <section className={styles.info}>
                    <div>
                        <div className={`${styles.profile} ${gamja.className}`}>
                            <div>
                                홍길동 <CheckCircleFilled style={{ color: '#0095e8' }} />
                            </div>
                            <ul>
                                <li>
                                    <SkinFilled style={{ marginRight: '5px' }} />
                                    사원
                                </li>
                                <li>
                                    <PhoneFilled style={{ marginRight: '5px' }} />
                                    010-1234-5678
                                </li>
                                <li>
                                    <HomeFilled style={{ marginRight: '5px' }} />
                                    대전,서구
                                </li>
                            </ul>
                        </div>
                        <div className={styles.btnWrap}>
                            <Button type={'primary'}>출근</Button>
                            <Button danger>퇴근</Button>
                        </div>
                    </div>

                    <div className={styles.summary}>
                        <div className={`${styles.infoArea} ${sono.className}`}>
                            <ul>
                                <li>
                                    <ArrowUpOutlined style={{ color: '#52c41a' }} /> 4500$
                                </li>
                                <li>Earnings</li>
                            </ul>
                            <ul>
                                <li>
                                    <ArrowDownOutlined style={{ color: '#f1416c' }} /> 75
                                </li>
                                <li>Projects</li>
                            </ul>
                            <ul>
                                <li>
                                    <LineOutlined /> 60%
                                </li>
                                <li>Success Rate</li>
                            </ul>
                        </div>

                        <div className={styles.process}>
                            <span className={`${gamja.className}`}>진척률?</span>
                            <Progress percent={50} />
                        </div>
                    </div>
                </section>
            </article>

            <Tabs defaultActiveKey={'1'} items={items} onChange={tabChangeAction} />
        </section>
    )
}

export default UserFormProfile
