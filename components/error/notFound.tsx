'use client'
import React from 'react'
import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'

import styles from './notFound.module.css'

const NotFound = () => {
    const router = useRouter()
    return (
        <div className={styles.wrap}>
            <Result
                status="404"
                title="올바르지 않은 주소"
                subTitle="비정상적인 접근입니다."
                extra={
                    <Button
                        onClick={() => {
                            router.push('/')
                        }}
                        type="primary"
                    >
                        Home
                    </Button>
                }
            />
        </div>
    )
}

export default NotFound
