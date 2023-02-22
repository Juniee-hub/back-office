'use client'
import { memo } from 'react'
import { Card } from 'antd'
import styles from './cardLists.module.css'

import { CardPorpTypes } from '@/types/board'

const CardLilsts = ({ dataLists }: CardPorpTypes) => {
    return (
        <div className={styles.wrap}>
            <>
                {dataLists.map((data, index) => {
                    const { id, name, title, content } = data

                    return (
                        <Card key={`cardIndexKey_${id}`} title={title} extra={<span>더보기..</span>}>
                            <p>작성자 : {name}</p>
                            <p>{content}</p>
                        </Card>
                    )
                })}
            </>
        </div>
    )
}

export default memo(CardLilsts)
