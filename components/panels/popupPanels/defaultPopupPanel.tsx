import React, { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'

import styels from './defaultPopupPanel.module.css'

interface PropsType {
    children: JSX.Element
    open?: boolean
    title?: string
    actionClose: () => void
}

const DefaultPopupPanel = ({ open = false, actionClose, title = '정보', children }: PropsType) => {
    useEffect(() => {
        const escKeyEvent = (e: KeyboardEvent) => {
            if (e.key === 'Escape') actionClose()
        }
        window.addEventListener('keydown', escKeyEvent)
        return () => {
            window.removeEventListener('keydown', escKeyEvent)
        }
    }, [actionClose])

    if (open === false) {
        return <></>
    }

    return (
        <div className={styels.wrap}>
            <div className={styels.titleWrap}>
                <h1>{title}</h1>
                <CloseOutlined onClick={actionClose} />
            </div>

            <article>{children}</article>
        </div>
    )
}

export default DefaultPopupPanel
