'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import styles from './clock.module.css'

const dayFormat = 'MM월 DD일'
const timeFormat = 'HH:mm:ss'
const format = `${dayFormat} ${timeFormat}`

const Clock = () => {
    const [nowTime, setNowTime] = useState<string>('')

    useEffect(() => {
        setNowTime(dayjs().format(format))
        const clockIntervalFnc = setInterval(() => {
            setNowTime(dayjs().format(format))
        }, 1000)

        return () => clearInterval(clockIntervalFnc)
    }, [])

    return (
        <div className={styles.wrap}>
            <h2>{nowTime}</h2>
        </div>
    )
}

export default Clock
