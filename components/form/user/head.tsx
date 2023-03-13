'use client'
import React from 'react'
import { Button } from 'antd'

import styles from './head.module.css'

const UserFormHead = () => {
    //@TODO: 스크롤시 position sticky 효과..... (순수 css로는 안됨 ㅠㅠ )
    // Idea..  Web API 중 Intersection Observer API 활용..??

    return (
        <section className={styles.wrap}>
            <span>회원 상세 정보</span>

            <div className={styles.btnWrap}>
                <Button>등록</Button>
                <Button danger>삭제</Button>
            </div>
        </section>
    )
}

export default UserFormHead
