import React from 'react'
import { SmileOutlined, LogoutOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Card, message } from 'antd'
import Image from 'next/image'

const { Meta } = Card

import styles from './profile.module.css'

// TODO: 알림정보 가져오기..
const ProfileCard = () => {
    const showMessage = (msg: string) => {
        message.info(msg)
    }

    return (
        <Card
            bordered={false}
            cover={<Image src={'/images/node-js-logo3.png'} width={'300'} height={'300'} alt="profile.." />}
            actions={[
                <SettingOutlined
                    key="setting"
                    onClick={() => {
                        showMessage('설정 버튼 클릭~')
                    }}
                />,
                <Badge key="notice" dot>
                    <BellOutlined
                        onClick={() => {
                            showMessage('알림 버튼 클릭~')
                        }}
                    />
                </Badge>,
                <LogoutOutlined
                    key="out"
                    onClick={() => {
                        showMessage('로그아웃 버튼 클릭~')
                    }}
                />,
            ]}
        >
            <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} title={'~~님의 정보'} description={'애플 HR 1 Team'} />
        </Card>
    )
}

const AdminProfile = () => {
    return (
        <div className={styles.wrap}>
            <Dropdown
                dropdownRender={(menu) => {
                    return <ProfileCard />
                }}
                placement="bottom"
                trigger={['hover']}
            >
                <Badge dot>
                    <Avatar shape="square" icon={<SmileOutlined />} />
                </Badge>
            </Dropdown>
        </div>
    )
}

export default AdminProfile
