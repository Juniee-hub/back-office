'use client'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Card, Space } from 'antd'

import styles from './feed.module.css'

const UserFormFeed = () => {
    //@TODO: Data Fetch.... ( react-query 사용... )

    return (
        <section className={styles.wrap}>
            <Space direction={'vertical'}>
                <Card>
                    <p>1번째 feed</p>
                </Card>
                <Card>
                    <p>2번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
                <Card>
                    <p>3번째 feed</p>
                </Card>
            </Space>
        </section>
    )
}

export default UserFormFeed
