'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { List, Card, Skeleton, Avatar, Button } from 'antd'

import styles from './userLists.module.css'
import { UserOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

const apiUrl = '/api/board'

const UserList = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axios.get(apiUrl)
            return res.data.dataLists //
        },
        retry: 2,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
    })

    if (isLoading || isError) {
        return (
            <>
                <Skeleton avatar paragraph={{ rows: 4 }} />
            </>
        )
    }

    return (
        <div className={styles.wrap}>
            <List
                itemLayout={'horizontal'}
                size={'large'}
                dataSource={[...data]}
                renderItem={(item) => (
                    <>
                        <List.Item
                            actions={[
                                <Button key={'edit'} icon={<EditOutlined />}>
                                    수정
                                </Button>,
                                <Button key={'delete'} danger icon={<DeleteOutlined />}>
                                    삭제
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta avatar={<Avatar icon={<UserOutlined />} />} title={<a href="https://ant.design">{item.name}</a>} description={item.content} />
                        </List.Item>
                    </>
                )}
            />
        </div>
    )
}

export default UserList
